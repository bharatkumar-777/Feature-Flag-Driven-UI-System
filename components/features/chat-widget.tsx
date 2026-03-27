"use client";

import { useState } from "react";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isOpen && (
        <div className="fixed bottom-20 right-4 z-40 w-80 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-2xl">
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                Live Support
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              ✕
            </button>
          </div>
          <div className="h-64 p-4 overflow-y-auto">
            <div className="flex flex-col gap-3">
              <div className="self-start max-w-[80%] rounded-lg bg-gray-100 dark:bg-gray-800 px-3 py-2">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Hi! How can we help you today?
                </p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 p-3">
            <input
              type="text"
              placeholder="Type a message..."
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent px-3 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-colors"
      >
        {isOpen ? "✕" : "💬"}
      </button>
    </>
  );
}
