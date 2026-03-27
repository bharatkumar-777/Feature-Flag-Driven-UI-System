"use client";

import { useEffect, useState } from "react";

interface ToastProps {
  message: string;
  type?: "info" | "warning" | "error";
  duration?: number;
  onClose?: () => void;
}

const typeStyles = {
  info: "bg-blue-500 text-white",
  warning: "bg-yellow-500 text-black",
  error: "bg-red-500 text-white",
};

export function Toast({
  message,
  type = "info",
  duration = 5000,
  onClose,
}: ToastProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose?.();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-4">
      <div
        className={`flex items-center gap-3 rounded-lg px-4 py-3 shadow-lg ${typeStyles[type]}`}
      >
        <span className="text-sm font-medium">{message}</span>
        <button
          onClick={() => {
            setVisible(false);
            onClose?.();
          }}
          className="ml-2 opacity-70 hover:opacity-100 transition-opacity"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
