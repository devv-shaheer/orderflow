export default function Button({ children, variant = "primary", className = "", ...props }) {
  const base = "inline-flex h-9 items-center justify-center gap-2 rounded-md px-4 text-sm font-medium outline-offset-2 focus-visible:outline-2 focus-visible:outline-brand disabled:opacity-50";
  const variants = {
    primary: "bg-brand text-surface hover:bg-brand-hover",
    secondary: "border border-line bg-surface text-ink hover:bg-canvas",
    destructive: "bg-danger text-surface hover:opacity-90",
    tertiary: "text-brand hover:bg-brand-soft",
  };
  return (
    <button className={`${base} ${variants[variant] ?? variants.primary} ${className}`} {...props}>
      {children}
    </button>
  );
}
