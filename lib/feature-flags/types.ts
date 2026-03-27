export interface FeatureFlag {
  name: string;
  enabled: boolean;
  description: string;
  depends_on: string[];
}

export interface FlagState {
  flags: Record<string, FeatureFlag>;
  isLoading: boolean;
  error: string | null;
  isFallback: boolean;
  lastFetched: number | null;
}

export interface FlagActions {
  fetchFlags: () => Promise<void>;
  toggleFlag: (name: string) => void;
  setFlags: (flags: FeatureFlag[]) => void;
  getFlagEnabled: (name: string) => boolean;
  getDependents: (name: string) => string[];
}

export type FlagStore = FlagState & FlagActions;
