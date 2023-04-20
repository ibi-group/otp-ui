import { flatten } from "flat";
import { ModeButtonDefinition, ModeSetting } from "@opentripplanner/types";
import React, { ReactElement } from "react";
import { useIntl } from "react-intl";
import styled from "styled-components";

import CheckboxSelector from "../CheckboxSelector";
import DropdownSelector from "../DropdownSelector";
import SliderSelector from "../SliderSelector";
import generateModeButtonLabel from "./i18n";

import defaultEnglishMessages from "../../i18n/en-US.yml";
import { QueryParamChangeEvent } from "../types";
// HACK: We should flatten the messages loaded above because
// the YAML loaders behave differently between webpack and our version of jest:
// - the yaml loader for webpack returns a nested object,
// - the yaml loader for jest returns messages with flattened ids.
export const defaultMessages: Record<string, string> = flatten(
  defaultEnglishMessages
);

const SettingsPanel = styled.fieldset`
  border: none;
  pointer-events: auto;

  display: grid;
  gap: 10px 5px;
  grid-template-columns: 1fr 1fr;

  .wide {
    grid-column: span 2;
  }
  .slim {
    font-size: 125%;
    font-weight: 125%;
  }

  legend {
    font-size: 1.5em;
    margin-bottom: 0.5rem;
    padding-top: 15px;
  }
`;

const SubSettingsCheckbox = styled(CheckboxSelector)`
  margin-left: 4px;
`;

const ModeSettingRenderer = ({
  onChange,
  setting
}: {
  onChange: (QueryParamChangeEvent) => void;
  setting: ModeSetting;
}) => {
  const intl = useIntl();
  const label = intl.formatMessage({
    defaultMessage:
      defaultMessages[`otpUi.ModeSelector.settings.${setting.key}-label`],
    description: `Metro Mode Selector Setting Label (${setting.key})`,
    id: `otpUi.ModeSelector.settings.${setting.key}-label`
  });

  switch (setting.type) {
    case "CHECKBOX":
      return (
        <SubSettingsCheckbox
          label={label}
          name={setting.key}
          onChange={onChange}
          value={setting.value}
        />
      );
    case "DROPDOWN":
      return (
        <DropdownSelector
          label={label}
          name={setting.key}
          onChange={onChange}
          options={setting.options.map(o => ({
            ...o,
            text: intl.formatMessage({
              description: `Metro Mode Selector Setting (${setting.key}) Option Label (${o.value})`,
              id: `otpUi.ModeSelector.settings.${setting.key}-options-${o.value}`
            })
          }))}
          value={setting.value}
        />
      );
    case "SLIDER":
      return (
        <SliderSelector
          label={label}
          labelHigh={intl.formatMessage({
            description: `Metro Mode Selector Setting Label High (${setting.key})`,
            id: `otpUi.ModeSelector.settings.${setting.key}-labelHigh`
          })}
          labelLow={intl.formatMessage({
            description: `Metro Mode Selector Setting Label Low (${setting.key})`,
            id: `otpUi.ModeSelector.settings.${setting.key}-labelLow`
          })}
          max={setting.high}
          min={setting.low}
          name={setting.key}
          onChange={(event: QueryParamChangeEvent) => {
            // If an inverse key is specified, calculate its value here
            if (setting.inverseKey) {
              event[setting.inverseKey] =
                setting.high - Number(event[setting.key]) + setting.low;
            }
            onChange(event);
          }}
          step={setting.step}
          value={setting.value}
        />
      );
    default:
      return null;
  }
};

interface Props {
  modeButton: ModeButtonDefinition;
  onSettingUpdate: (QueryParamChangeEvent) => void;
}
export default function SubSettingsPane({
  modeButton,
  onSettingUpdate
}: Props): ReactElement {
  const intl = useIntl();
  const label = generateModeButtonLabel(modeButton.key, intl);
  return (
    <SettingsPanel>
      <legend>
        <span id={`metro-mode-selector-${modeButton.key}-button-label`}>
          {label}
        </span>
      </legend>
      {modeButton.modeSettings?.map(setting => (
        <div
          key={setting.key}
          className={setting?.addTransportMode ? "slim" : "wide"}
        >
          <ModeSettingRenderer onChange={onSettingUpdate} setting={setting} />
        </div>
      ))}
    </SettingsPanel>
  );
}
