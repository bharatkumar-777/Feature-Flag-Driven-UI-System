"use client";

import { useFeatureFlagStore } from "../store/feature-flag-store";
import { FeatureFlag } from "../types";

export function useFeatureFlag(flagName: string): boolean {
  return useFeatureFlagStore((state) => state.getFlagEnabled(flagName));
}

export function useFeatureFlags(): Record<string, FeatureFlag> {
  return useFeatureFlagStore((state) => state.flags);
}

export function useFeatureFlagLoading(): boolean {
  return useFeatureFlagStore((state) => state.isLoading);
}

export function useFeatureFlagError(): string | null {
  return useFeatureFlagStore((state) => state.error);
}

export function useIsFallback(): boolean {
  return useFeatureFlagStore((state) => state.isFallback);
}
