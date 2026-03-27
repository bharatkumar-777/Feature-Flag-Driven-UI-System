"use client";

import { ReactNode, Suspense, useMemo, ComponentType } from "react";
import { useFeatureFlag, useFeatureFlagLoading } from "./hooks";

function DefaultSkeleton() {
  return (
    <div className="animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700 h-32 w-full" />
  );
}

interface FeatureGateProps {
  flag: string;
  children: ReactNode;
  fallback?: ReactNode;
}

export function FeatureGate({ flag, children, fallback = null }: FeatureGateProps) {
  const isEnabled = useFeatureFlag(flag);
  const isLoading = useFeatureFlagLoading();

  if (isLoading) return <DefaultSkeleton />;
  if (!isEnabled) return <>{fallback}</>;
  return <>{children}</>;
}

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

  if (isLoading) return <>{loadingFallback ?? <DefaultSkeleton />}</>;
  if (!isEnabled || !LazyComponent) return <>{fallback}</>;

  return (
    <Suspense fallback={loadingFallback ?? <DefaultSkeleton />}>
      <LazyComponent />
    </Suspense>
  );
}
