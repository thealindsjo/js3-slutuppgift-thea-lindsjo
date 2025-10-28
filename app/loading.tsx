import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
  return (
    <main
      className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-sm"
      role="status"
      aria-live="polite"
    >
      <div className="flex flex-col items-center gap-3">
        <Spinner />
        <span className="text-sm text-gray-700">Loading…</span>
      </div>
    </main>
  );
}
