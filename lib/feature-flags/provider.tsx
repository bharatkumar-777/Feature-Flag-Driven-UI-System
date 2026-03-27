"use client";

import { useEffect, ReactNode, useState } from "react";
import { useFeatureFlagStore } from "./store";
import { useIsFallback } from "./hooks";
import { Toast } from "@/components/ui/toast";

const POLL_INTERVAL = 60000; // 60 seconds

export function FeatureFlagProvider({ children }: { children: ReactNode }) {
  const fetchFlags = useFeatureFlagStore((s) => s.fetchFlags);
  const isFallback = useIsFallback();
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    fetchFlags();

    const interval = setInterval(fetchFlags, POLL_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchFlags]);

  useEffect(() => {
    if (isFallback) setShowToast(true);
  }, [isFallback]);

  return (
    <>
      {children}
      {showToast && (
        <Toast
          message="Using cached feature flags. Some features may not reflect the latest configuration."
          type="warning"
          duration={8000}
          onClose={() => setShowToast(false)}
        />
      )}
    </>
  );
}
