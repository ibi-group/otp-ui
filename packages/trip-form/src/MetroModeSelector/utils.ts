import {
  ModeButtonDefinition,
  ModeSetting,
  ModeSettingValues,
  TransportMode
} from "@opentripplanner/types";
import { useState } from "react";
import { QueryParamConfig, decodeQueryParams } from "serialize-query-params";
import {
  useQueryParam,
  DelimitedArrayParam,
  ObjectParam
} from "use-query-params";

import coreUtils from "@opentripplanner/core-utils";
import { QueryParamChangeEvent } from "../types";

const { queryGen } = coreUtils;
const { TRANSIT_SUBMODES_AND_TRANSIT } = queryGen;

type InitialStateType = {
  enabledModeButtons: string[];
  modeSettingValues: ModeSettingValues;
};

type ModeStateConfig = {
  queryParamState?: boolean;
};

/**
 * Aggregates all the modes from the input mode button definitions
 * Should probably filter unique values, but it's not possible with a Set due to them being objects
 * @param modeButtonDefinitions Array of mode buttons
 * @returns All the (unique) modes from the buttons
 */
export function aggregateModes(
  modeButtonDefinitions: ModeButtonDefinition[]
): TransportMode[] {
  return modeButtonDefinitions.reduce<Array<TransportMode>>((array, combo) => {
    combo.modes.forEach(mode => array.push(mode));
    return array;
  }, new Array<TransportMode>());
}

/**
 * Filters mode buttons by list of keys, used to find enabled buttons.
 * TODO: Remove this function? Is it needed?
 * @param modeButtonDefinitions All mode definitions
 * @param keys List of keys of buttons to include
 * @returns Filtered list of buttons
 */
export function filterModeDefitionsByKey(
  modeButtonDefinitions: ModeButtonDefinition[],
  keys: string[]
): ModeButtonDefinition[] {
  return modeButtonDefinitions.filter(def => keys.includes(def.key));
}

/**
 * Sometimes we might get a string when we want a boolean or number,
 * since the URL state is stored as a string. This method helps convert
 * those values into the correct type.
 */
export function convertModeSettingValue(
  setting: ModeSetting,
  value: string | boolean | number
): string | boolean | number {
  switch (setting.type) {
    case "CHECKBOX":
      return value === "true" || value === true;
    case "SLIDER":
      return Number(value);
    default:
      return value;
  }
}

/**
 * Connects the mode setting values from a values object, where each key corresponds
 * to a mode setting in the modeSettings parameter.
 * @param modeSettings The mode settings with empty `value` params
 * @param values An object containing setting values
 * @returns Mode settings with values populated
 */
export function populateSettingsWithValues(
  modeSettings: ModeSetting[],
  values: ModeSettingValues
): ModeSetting[] {
  return modeSettings.map(setting => {
    const value = values[setting.key];
    const convertedValue = convertModeSettingValue(setting, value);
    return {
      ...setting,
      value: convertedValue as string & number & boolean
    };
  });
}

/**
 * Extracts the defaults from each mode setting into an object
 * where the keys correspond with the keys from the mode setting.
 * @param modeSetting Mode settings with `default`s populated
 * @returns Object containing just the keys and values from defaults
 */
export function extractModeSettingDefaultsToObject(
  modeSettings: ModeSetting[]
): ModeSettingValues {
  return modeSettings?.reduce((prev, cur) => {
    prev[cur.key] = cur.default;
    if (cur.type === "SLIDER" && cur.inverseKey && cur.default) {
      prev[cur.inverseKey] = cur.high - cur.default + cur.low;
    }
    return prev;
  }, {});
}

/**
 * This function is used to apply the ModeSettings to the ModeButtons by checking
 * each setting against all the transport modes in the button. It also handles the special
 * case of a "TRANSIT" mode setting, which can apply to all of the different possible TRANSIT_MODES.
 * @param setting Mode setting to check
 * @param mode TransportMode to check against
 * @returns Whether this mode setting applies to this TransportMode
 */
export function checkIfModeSettingApplies(
  setting: ModeSetting,
  mode: TransportMode
): boolean {
  if (setting.applicableMode === "TRANSIT") {
    return TRANSIT_SUBMODES_AND_TRANSIT.includes(mode.mode);
  }
  return setting.applicableMode === mode.mode;
}

/**
 * Higher order function that can be used in `map` to add mode settings to mode button definitions.
 * @param settings Mode settings to be added to button
 * @returns Function that accepts a mode button definition, returning mode button def with populated settings
 */
export const addSettingsToButton = (settings: ModeSetting[]) => (
  button: ModeButtonDefinition
): ModeButtonDefinition => {
  const settingsForThisCombination = Array.from(
    new Set(
      button.modes?.reduce<ModeSetting[]>((prev, mode) => {
        return [
          ...prev,
          ...settings.filter(def => checkIfModeSettingApplies(def, mode))
        ];
      }, [])
    )
  );

  return {
    ...button,
    modeSettings: settingsForThisCombination
  };
};

/**
 * State storage hook that can either store the state in React useState hook or in the
 * the URL Query Params using useQueryParam library. The reason this exists is so that the mode
 * selector can function in the storybook where modifying the URL doesn't work. It also
 * helps handle the initial value for when the URL doesn't have the associated query param.
 * @param name Name of parameter
 * @param stateType Type of object to be stored
 * @param storeInQueryParam Store this object in query params or in React state hook
 * @param defaultState The default state/initial state
 * @returns Getter and setter just like useState
 */
function useStateStorage<Type>(
  name: string,
  stateType: QueryParamConfig<Type>,
  storeInQueryParam: boolean,
  defaultState?: Type
): [Type, (newValue: Type) => void] {
  const [qpState, setQpState] = useQueryParam<Type>(name, stateType);
  const [reactState, setReactState] = useState<Type>(defaultState);

  if (!storeInQueryParam) {
    return [reactState, setReactState];
  }

  if (qpState === undefined) {
    return [defaultState, setQpState];
  }
  return [qpState, setQpState];
}

/**
 * Grabs the activated modes and mode settings from the URL string
 * when provided with all the necessary parameters. This allows access to the
 * same parameters as useModeState in a context where React Hooks are not available,
 * such as in Redux.
 * @param searchString URL String
 * @param modeButtons Mode button definitions (from config)
 * @param modeSettingDefinitions Mode setting definitions (from config/defaults)
 * @param initialState Initial state (from config)
 * @returns Array of active TransportModes and all the mode settings
 */
export function getActivatedModesFromQueryParams(
  searchString: string,
  modeButtons: ModeButtonDefinition[],
  modeSettingDefinitions: ModeSetting[],
  initialState: InitialStateType
): { activeModes: TransportMode[]; modeSettings: ModeSetting[] } {
  const queryObject = new URLSearchParams(searchString);

  const decodedQuery = decodeQueryParams(
    { modeButtons: DelimitedArrayParam, modeSettings: ObjectParam },
    {
      modeButtons: queryObject.get("modeButtons"),
      modeSettings: queryObject.get("modeSettings")
    }
  );

  const enabledKeys =
    decodedQuery.modeButtons || initialState.enabledModeButtons;
  const activeButtons = filterModeDefitionsByKey(modeButtons, enabledKeys);

  const modeSettingValues = {
    // TODO: Do we want to keep these defaults with the definitions or only support it in initial state?
    ...extractModeSettingDefaultsToObject(modeSettingDefinitions),
    ...initialState.modeSettingValues,
    ...decodedQuery.modeSettings
  };

  const modeSettingsWithValues = populateSettingsWithValues(
    modeSettingDefinitions,
    modeSettingValues
  );
  return {
    activeModes: aggregateModes(activeButtons),
    modeSettings: modeSettingsWithValues
  };
}

/**
 * Provides a function that sets mode buttons' enabled state
 * Intended to be composed in a map
 * @param initialState Initial State object
 * @param enabledKeys Array of enabled keys, if not provided default to initial state
 * @returns Function that accepts mode button and returns a mode button with enabled key set
 */
export function setModeButtonEnabled(
  initialState: InitialStateType,
  enabledKeys?: string[]
) {
  return (modeButton: ModeButtonDefinition): ModeButtonDefinition => {
    return {
      ...modeButton,
      // If we have a list of enabled keys, use that, otherwise check the inital state
      enabled: enabledKeys
        ? enabledKeys.includes(modeButton.key)
        : initialState.enabledModeButtons.includes(modeButton.key)
    };
  };
}

/**
 * This useModeState hook is designed to handle all the state relating to the mode selector.
 * It consumes and provides all the needed data to make the mode selector work.
 * @param buttonsFromConfig List of mode buttons to be displayed
 * @param initialState Initial state object for mode button activation and mode setting defaults
 * @param modeSettingDefinitions Definitions of all the mode settings available
 * @param configuration Config to specify whether to store in url query param or react useState hook
 * @returns Data to be used by mode selector and query generation
 */
export function useModeState(
  buttonsFromConfig: ModeButtonDefinition[],
  initialState: InitialStateType,
  modeSettingDefinitions: ModeSetting[],
  { queryParamState }: ModeStateConfig
): {
  setModeSettingValue: (setting: QueryParamChangeEvent) => void;
  buttonsWithSettings: ModeButtonDefinition[];
  enabledModeButtonKeys: string[];
  enabledModes: TransportMode[];
  toggleModeButton: (key: string) => void;
  modeSettings: ModeSetting[];
} {
  const [enabledModeButtonKeys, setEnabledModeButtonKeys] = useStateStorage<
    string[]
  >(
    "modeButtons",
    DelimitedArrayParam,
    queryParamState,
    initialState.enabledModeButtons
  );

  const modeButtons = buttonsFromConfig.map(combo => ({
    ...combo,
    enabled: enabledModeButtonKeys.includes(combo.key)
  }));

  const toggleModeButton = (modeButtonKey: string) => {
    if (enabledModeButtonKeys.includes(modeButtonKey)) {
      setEnabledModeButtonKeys(
        enabledModeButtonKeys.filter(c => c !== modeButtonKey)
      );
    } else {
      setEnabledModeButtonKeys([...enabledModeButtonKeys, modeButtonKey]);
    }
  };

  const defaultModeSettingsValues = {
    ...extractModeSettingDefaultsToObject(modeSettingDefinitions),
    ...initialState.modeSettingValues
  };

  // Handle ModeSettings state
  const [modeSettingsValues, setModeSettingsValues] = useStateStorage<
    ModeSettingValues
  >("modeSettings", ObjectParam, queryParamState, defaultModeSettingsValues);

  const setModeSettingValue = (setting: QueryParamChangeEvent) => {
    setModeSettingsValues({
      ...modeSettingsValues,
      ...setting
    });
  };

  const settingsWithValues = populateSettingsWithValues(
    modeSettingDefinitions,
    modeSettingsValues
  );

  const buttonsWithSettings = modeButtons.map(
    addSettingsToButton(settingsWithValues)
  );

  const enabledModeButtons = filterModeDefitionsByKey(
    buttonsWithSettings,
    enabledModeButtonKeys
  );
  const enabledModes = aggregateModes(enabledModeButtons);

  return {
    setModeSettingValue,
    buttonsWithSettings,
    enabledModeButtonKeys,
    enabledModes,
    modeSettings: settingsWithValues,
    toggleModeButton
  };
}
