export default function Card({ title, children, className = "" }) {
  return (
    <section className={`rounded-md border border-line bg-surface p-5 ${className}`}>
      {title && <h2 className="mb-3 text-sm font-semibold text-ink">{title}</h2>}
      {children}
    </section>
  );
}
