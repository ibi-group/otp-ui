import { useState } from "react";
import {
  useQueryParam,
  DelimitedArrayParam,
  ObjectParam
} from "use-query-params";
import { QueryParamConfig, decodeQueryParams } from "serialize-query-params";
import {
  ModeButtonDefinition,
  ModeSetting,
  ModeSettingValues,
  TransportMode
} from "@opentripplanner/types";
import { QueryParamChangeEvent } from "../types";

export type InitialStateType = {
  enabledModeButtons: string[];
  modeSettingValues: ModeSettingValues;
};

export type ModeStateConfig = {
  queryParamState?: boolean;
};

/**
 * Aggregates all the unique modes from buttons passed in
 * @param modeButtonDefinitions Array of mode buttons
 * @returns All the (unique) modes from the buttons
 */
function aggregateModes(modeButtonDefinitions: ModeButtonDefinition[]) {
  return Array.from(
    modeButtonDefinitions.reduce<Set<TransportMode>>((set, combo) => {
      combo.modes.forEach(mode => set.add(mode));
      return set;
    }, new Set<TransportMode>())
  );
}

/**
 * Filters mode buttons by list of keys, used to find enabled buttons.
 * TODO: Remove this function? Is it needed?
 * @param modeButtonDefinitions All mode definitions
 * @param keys List of keys of buttons to include
 * @returns Filtered list of buttons
 */
function filterModeDefitionsByKey(
  modeButtonDefinitions: ModeButtonDefinition[],
  keys: string[]
) {
  return modeButtonDefinitions.filter(def => keys.includes(def.key));
}

/**
 * Connects the mode setting values from a values object, where each key corresponds
 * to a mode setting in the modeSettings parameter.
 * @param modeSettings The mode settings with empty `value` params
 * @param values An object containing setting values
 * @returns Mode settings with values populated
 */
function populateSettingsWithValues(
  modeSettings: ModeSetting[],
  values: ModeSettingValues
): ModeSetting[] {
  return modeSettings.map(setting => ({
    ...setting,
    value: values[setting.key] as boolean & number & string
  }));
}

/**
 * Extracts the values from each mode setting into an object
 * where the keys correspond with the keys from the mode setting.
 * @param modeSetting Mode settings with `values` populated
 * @returns Object containing just the keys and values
 */
function extractModeSettingValuesToObject(
  modeSettings: ModeSetting[]
): ModeSettingValues {
  return modeSettings.reduce((prev, cur) => {
    prev[cur.key] = cur.default;
    return prev;
  }, {});
}

/**
 * Higher order function that can be used in `map` to add mode settings to mode button definitions.
 * @param settings Mode settings to be added to button
 * @returns Function that accepts a mode button definition, returning mode button def with populated settings
 */
export const addSettingsToButton = (settings: ModeSetting[]) => (
  combination: ModeButtonDefinition
): ModeButtonDefinition => {
  const settingsForThisCombination = combination.modes.reduce<ModeSetting[]>(
    (prev, mode) => {
      return [
        ...prev,
        ...settings.filter(def => def.applicableMode === mode.mode)
      ];
    },
    []
  );

  return {
    ...combination,
    modeSettings: settingsForThisCombination
  };
};

export function useStateStorage<Type>(
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
 * same parmeters as useModeState in a context where React Hooks are not available,
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
    ...extractModeSettingValuesToObject(modeSettingDefinitions),
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
    ...extractModeSettingValuesToObject(modeSettingDefinitions),
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