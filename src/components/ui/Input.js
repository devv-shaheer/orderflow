export default function Input({ label, className = "", ...props }) {
  return (
    <label className="block">
      {label && <span className="mb-1 block text-sm font-medium text-ink">{label}</span>}
      <input
        className={`h-9 w-full rounded-md border border-line bg-surface px-3 text-sm outline-offset-2 focus-visible:outline-2 focus-visible:outline-brand ${className}`}
        {...props}
      />
    </label>
  );
}
