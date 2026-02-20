export default function LoadingSpinner({ stage }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <div className="spinner" />
      <p className="text-sm font-mono" style={{ color: "var(--muted)" }}>
        {stage || "Loading…"}
      </p>
    </div>
  );
}
