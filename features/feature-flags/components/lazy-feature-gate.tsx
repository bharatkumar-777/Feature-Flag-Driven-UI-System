"use client";

import { ReactNode, Suspense, useMemo, ComponentType } from "react";
import { useFeatureFlag, useFeatureFlagLoading } from "../hooks/use-feature-flags";
import { Skeleton } from "@/components/ui/skeleton";

interface LazyFeatureGateProps {
  flag: string;
  loader: () => Promise<{ default: ComponentType }>;
  fallback?: ReactNode;
  loadingFallback?: ReactNode;
}

export function LazyFeatureGate({
  flag,
  loader,
  fallback = null,
  loadingFallback,
}: LazyFeatureGateProps) {
  const isEnabled = useFeatureFlag(flag);
  const isLoading = useFeatureFlagLoading();

  const LazyComponent = useMemo(() => {
    if (!isEnabled) return null;
    const { lazy } = require("react");
    return lazy(loader);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEnabled, loader]);

  const shimmer = loadingFallback ?? <Skeleton />;

  if (isLoading) return <>{shimmer}</>;
  if (!isEnabled || !LazyComponent) return <>{fallback}</>;

  return (
    <Suspense fallback={shimmer}>
      <LazyComponent />
    </Suspense>
  );
}
