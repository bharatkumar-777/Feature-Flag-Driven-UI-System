import { create } from "zustand";
import { FlagStore, FeatureFlag } from "./types";
import { DEFAULT_FLAGS, LOCALSTORAGE_KEY, FLAGS_API_URL } from "./defaults";

function arrayToRecord(flags: FeatureFlag[]): Record<string, FeatureFlag> {
  const record: Record<string, FeatureFlag> = {};
  for (const flag of flags) {
    record[flag.name] = flag;
  }
  return record;
}

function loadCachedFlags(): Record<string, FeatureFlag> | null {
  if (typeof window === "undefined") return null;
  try {
    const cached = localStorage.getItem(LOCALSTORAGE_KEY);
    if (!cached) return null;
    const parsed = JSON.parse(cached) as FeatureFlag[];
    return arrayToRecord(parsed);
  } catch {
    return null;
  }
}

function saveFlagsToCache(flags: Record<string, FeatureFlag>) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(Object.values(flags)));
  } catch {
    // localStorage full or unavailable
  }
}

function cascadeDisable(
  flags: Record<string, FeatureFlag>,
  disabledName: string,
  visited: Set<string> = new Set()
): Record<string, FeatureFlag> {
  if (visited.has(disabledName)) return flags;
  visited.add(disabledName);

  for (const flag of Object.values(flags)) {
    if (flag.depends_on.includes(disabledName) && flag.enabled) {
      flags[flag.name] = { ...flag, enabled: false };
      cascadeDisable(flags, flag.name, visited);
    }
  }
  return flags;
}

function allParentsEnabled(
  flagName: string,
  flags: Record<string, FeatureFlag>
): boolean {
  const flag = flags[flagName];
  if (!flag) return false;
  for (const parentName of flag.depends_on) {
    const parent = flags[parentName];
    if (!parent || !parent.enabled) return false;
    if (!allParentsEnabled(parentName, flags)) return false;
  }
  return true;
}

export const useFeatureFlagStore = create<FlagStore>((set, get) => ({
  flags: {},
  isLoading: true,
  error: null,
  isFallback: false,
  lastFetched: null,

  fetchFlags: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await fetch(FLAGS_API_URL);
      if (!res.ok) throw new Error(`API returned ${res.status}`);
      const data: FeatureFlag[] = await res.json();
      const flags = arrayToRecord(data);
      saveFlagsToCache(flags);
      set({
        flags,
        isLoading: false,
        isFallback: false,
        lastFetched: Date.now(),
        error: null,
      });
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Failed to fetch flags";
      const cached = loadCachedFlags();
      if (cached) {
        set({
          flags: cached,
          isLoading: false,
          isFallback: true,
          error: errorMsg,
        });
      } else {
        set({
          flags: arrayToRecord(DEFAULT_FLAGS),
          isLoading: false,
          isFallback: true,
          error: errorMsg,
        });
      }
    }
  },

  toggleFlag: (name: string) => {
    const { flags } = get();
    const flag = flags[name];
    if (!flag) return;

    const newFlags = { ...flags };
    const newEnabled = !flag.enabled;

    if (newEnabled) {
      // Enabling: check all parents are enabled
      if (!allParentsEnabled(name, newFlags)) return;
      newFlags[name] = { ...flag, enabled: true };
    } else {
      // Disabling: cascade disable all dependents
      newFlags[name] = { ...flag, enabled: false };
      cascadeDisable(newFlags, name);
    }

    set({ flags: newFlags });
    saveFlagsToCache(newFlags);
  },

  setFlags: (flagArray: FeatureFlag[]) => {
    const flags = arrayToRecord(flagArray);
    set({ flags });
    saveFlagsToCache(flags);
  },

  getFlagEnabled: (name: string): boolean => {
    const { flags } = get();
    const flag = flags[name];
    if (!flag || !flag.enabled) return false;
    return allParentsEnabled(name, flags);
  },

  getDependents: (name: string): string[] => {
    const { flags } = get();
    return Object.values(flags)
      .filter((f) => f.depends_on.includes(name))
      .map((f) => f.name);
  },
}));
