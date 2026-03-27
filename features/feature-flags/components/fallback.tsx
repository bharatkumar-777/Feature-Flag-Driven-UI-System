import Link from "next/link";

interface FallbackProps {
  feature?: string;
}

export function Fallback({ feature }: FallbackProps) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-dashed border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/30 px-5 py-4">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-200 dark:bg-gray-700 text-base">
        🔒
      </span>
      <div className="min-w-0">
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {feature ? (
            <>
              <code className="font-mono text-xs bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded">
                {feature}
              </code>{" "}
              is disabled
            </>
          ) : (
            "Feature disabled"
          )}
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
          Turn it on in the{" "}
          <Link
            href="/admin"
            className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 underline underline-offset-2"
          >
            Admin Panel
          </Link>
        </p>
      </div>
    </div>
  );
}
