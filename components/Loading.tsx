import { Spinner } from "@/components/ui/spinner";

interface LoadingProps {
  message?: string;
  size?: "sm" | "md" | "lg";
  fullScreen?: boolean;
}

export function Loading({
  message = "Loading...",
  size = "md",
  fullScreen = false,
}: LoadingProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  };

  const containerClass = fullScreen
    ? "fixed inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-sm"
    : "flex items-center justify-center p-4";

  return (
    <div className={containerClass} role="status" aria-live="polite">
      <div className="flex flex-col items-center gap-3">
        <div className={`animate-spin text-sky-600 ${sizeClasses[size]}`}>
          <Spinner />
        </div>
        <span className="text-sm text-gray-700">{message}</span>
      </div>
    </div>
  );
}
