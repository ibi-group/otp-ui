import React, { ReactElement, useState } from "react";
import { ModeButtonDefinition } from "@opentripplanner/types";
import * as Core from "..";
import { QueryParamChangeEvent } from "../types";
import {
  addSettingsToButton,
  extractModeSettingDefaultsToObject,
  populateSettingWithValue,
  setModeButtonEnabled
} from "./utils";
import {
  defaultModeButtonDefinitions,
  getIcon,
  modeSettingDefinitionsWithDropdown
} from "./mockButtons.story";

const initialState = {
  enabledModeButtons: ["transit"],
  modeSettingValues: {}
};

function pipe<T>(...fns: Array<(arg: T) => T>) {
  return (value: T) => fns.reduce((acc, fn) => fn(acc), value);
}

const MetroModeSubsettingsComponent = ({
  fillModeIcons,
  modeButtonDefinitions,
  onSetModeSettingValue,
  onToggleModeButton
}: {
  fillModeIcons?: boolean;
  modeButtonDefinitions: Array<ModeButtonDefinition>;
  onSetModeSettingValue: (event: QueryParamChangeEvent) => void;
  onToggleModeButton: (key: string, newState: boolean) => void;
}): ReactElement => {
  const [modeSettingValues, setModeSettingValues] = useState({});
  const modeSettingValuesWithDefaults = {
    ...extractModeSettingDefaultsToObject(modeSettingDefinitionsWithDropdown),
    ...initialState.modeSettingValues,
    ...modeSettingValues
  };

  const [activeModeButtonKeys, setModeButtonKeys] = useState(
    initialState.enabledModeButtons
  );

  const addIconToModeSetting = msd => ({
    ...msd,
    icon: getIcon(msd.iconName)
  });

  const processedModeSettings = modeSettingDefinitionsWithDropdown.map(
    pipe(
      addIconToModeSetting,
      populateSettingWithValue(modeSettingValuesWithDefaults)
    )
  );

  const processedModeButtons = modeButtonDefinitions.map(
    pipe(
      addSettingsToButton(processedModeSettings),
      setModeButtonEnabled(activeModeButtonKeys)
    )
  );

  const toggleModeButtonAction = (key: string, newState: boolean) => {
    if (newState) {
      setModeButtonKeys([...activeModeButtonKeys, key]);
    } else {
      setModeButtonKeys(activeModeButtonKeys.filter(button => button !== key));
    }
    // Storybook Action:
    onToggleModeButton(key, newState);
  };

  const setModeSettingValueAction = (event: QueryParamChangeEvent) => {
    setModeSettingValues({ ...modeSettingValues, ...event });
    // Storybook Action:
    onSetModeSettingValue(event);
  };

  return (
    <Core.AdvancedModeSubsettingsContainer
      fillModeIcons={fillModeIcons}
      label="Select a transit mode"
      modeButtons={processedModeButtons}
      onSettingsUpdate={setModeSettingValueAction}
      onToggleModeButton={toggleModeButtonAction}
    />
  );
};

const Template = (args: {
  fillModeIcons?: boolean;
  onSetModeSettingValue: (event: QueryParamChangeEvent) => void;
  onToggleModeButton: (key: string, newState: boolean) => void;
}): ReactElement => (
  <MetroModeSubsettingsComponent
    modeButtonDefinitions={defaultModeButtonDefinitions}
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...args}
  />
);

export const AdvancedModeSettingsButtons = Template.bind({});

export default {
  argTypes: {
    fillModeIcons: { control: "boolean" },
    onSetModeSettingValue: { action: "set mode setting value" },
    onToggleModeButton: { action: "toggle button" }
  },
  component: MetroModeSubsettingsComponent,
  title: "Trip Form Components/Advanced Mode Settings Buttons"
};