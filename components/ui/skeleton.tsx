interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = "h-32 w-full" }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700 ${className}`}
    />
  );
}
