"use client";

import { ReactNode } from "react";
import { useFeatureFlag, useFeatureFlagLoading } from "../hooks/use-feature-flags";
import { Skeleton } from "@/components/ui/skeleton";

interface FeatureGateProps {
  flag: string;
  children: ReactNode;
  fallback?: ReactNode;
}

export function FeatureGate({ flag, children, fallback = null }: FeatureGateProps) {
  const isEnabled = useFeatureFlag(flag);
  const isLoading = useFeatureFlagLoading();

  if (isLoading) return <Skeleton />;
  if (!isEnabled) return <>{fallback}</>;
  return <>{children}</>;
}
