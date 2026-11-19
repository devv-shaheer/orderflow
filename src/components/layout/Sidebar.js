"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navGroups, footerItems } from "@/config/navigation";
import { IconMenu2, IconChevronLeft } from "@tabler/icons-react";

function NavItem({ item, pathname, collapsed }) {
  const Icon = item.icon;
  const active =
    pathname === item.href || pathname.startsWith(item.href + "/");

  return (
    <Link
      href={item.href}
      aria-current={active ? "page" : undefined}
      title={collapsed ? item.label : undefined}
      className={`flex h-9 items-center gap-3 rounded-md px-3 text-sm font-medium outline-offset-2 focus-visible:outline-2 focus-visible:outline-brand ${
        collapsed ? "justify-center px-0" : ""
      } ${
        active
          ? "bg-brand-soft text-brand"
          : "text-muted hover:bg-canvas hover:text-ink"
      }`}
    >
      <Icon size={20} stroke={1.75} aria-hidden="true" />
      {!collapsed && item.label}
    </Link>
  );
}

export default function Sidebar({
  collapsed = false,
  onToggleCollapse,
  mobileOpen = false,
  onCloseMobile,
}) {
  const pathname = usePathname();

  const width = collapsed ? "w-16" : "w-60";

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-ink/40 md:hidden"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}
      <aside
        className={`${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        } fixed z-40 flex h-dvh ${width} shrink-0 flex-col border-r border-line bg-surface transition-transform md:static md:translate-x-0`}
      >
        <div className="flex h-14 items-center justify-between border-b border-line px-4">
          {!collapsed && (
            <span className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-brand text-sm font-semibold text-surface">
                O
              </span>
              <span className="text-base font-semibold">OrderFlow</span>
            </span>
          )}
          {collapsed && (
            <span className="mx-auto flex h-7 w-7 items-center justify-center rounded-md bg-brand text-sm font-semibold text-surface">
              O
            </span>
          )}
          <button
            type="button"
            onClick={onToggleCollapse}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="hidden h-7 w-7 items-center justify-center rounded-md text-muted hover:bg-canvas md:inline-flex"
          >
            <IconChevronLeft
              size={16}
              stroke={1.75}
              className={collapsed ? "rotate-180" : ""}
              aria-hidden="true"
            />
          </button>
        </div>

        <nav aria-label="Main" className="flex-1 overflow-y-auto px-3 py-4">
          {navGroups.map((group, index) => (
            <div key={group.label ?? "top"} className={index > 0 ? "mt-5" : ""}>
              {!collapsed && group.label && (
                <p className="mb-1 px-3 text-xs font-medium uppercase tracking-wide text-muted">
                  {group.label}
                </p>
              )}
              <ul className="space-y-0.5">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <NavItem item={item} pathname={pathname} collapsed={collapsed} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="border-t border-line px-3 py-3">
          <ul>
            {footerItems.map((item) => (
              <li key={item.href}>
                <NavItem item={item} pathname={pathname} collapsed={collapsed} />
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
}
