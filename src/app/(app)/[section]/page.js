import { notFound } from "next/navigation";
import { allNavItems } from "@/config/navigation";

export const instant = false;

export default async function SectionPage({ params }) {
  const { section } = await params;
  const href = `/${section}`;
  const item = allNavItems.find((i) => i.href === href);
  if (!item) notFound();
  return (
    <div>
      <h1 className="text-2xl font-semibold text-ink">{item.label}</h1>
      <p className="mt-2 text-muted">
        Not built yet. This page exists so the navigation can be tested.
      </p>
    </div>
  );
}
