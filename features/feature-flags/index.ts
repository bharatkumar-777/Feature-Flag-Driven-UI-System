// Gates
export { FeatureGate } from "./components/feature-gate";
export { LazyFeatureGate } from "./components/lazy-feature-gate";
export { Fallback } from "./components/fallback";

// Admin
export { FlagPanel } from "./components/admin/flag-panel";
export { FlagToggle } from "./components/admin/flag-toggle";

// Provider
export { FeatureFlagProvider } from "./provider/feature-flag-provider";

// Hooks
export {
  useFeatureFlag,
  useFeatureFlags,
  useFeatureFlagLoading,
  useFeatureFlagError,
  useIsFallback,
} from "./hooks/use-feature-flags";

// Store (for direct store access)
export { useFeatureFlagStore } from "./store/feature-flag-store";

// Types
export type { FeatureFlag, FlagState, FlagActions, FlagStore } from "./types";

// Constants
export { DEFAULT_FLAGS, FLAG_ICONS } from "./constants";
