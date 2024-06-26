export type ModeOption = {
  id: string;
  selected?: boolean;
  showTitle?: boolean;
  text: JSX.Element;
  title?: string;
};

export type ModeSelectorOptions = {
  primary: ModeOption;
  secondary?: ModeOption[];
  tertiary?: ModeOption[];
};

export type ConfiguredMode =
  | string
  | {
      mode: string;
      label: string;
      company?: string;
    };

export type ConfiguredModes = {
  transitModes: ConfiguredMode[];
  accessModes: ConfiguredMode[];
  exlcusiveModes: ConfiguredMode[];
  bicycleModes: ConfiguredMode[];
  micromobilityModes: ConfiguredMode[];
};
