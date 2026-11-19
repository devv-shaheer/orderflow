"use client";

import { IconSearch, IconPlus, IconBell, IconUser, IconMenu2 } from "@tabler/icons-react";

export default function TopBar({ onMobileMenu }) {
  return (
    <header className="flex h-14 shrink-0 items-center gap-4 border-b border-line bg-surface px-6">
      <button
        type="button"
        onClick={onMobileMenu}
        aria-label="Open navigation"
        className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted hover:bg-canvas hover:text-ink md:hidden"
      >
        <IconMenu2 size={20} stroke={1.75} aria-hidden="true" />
      </button>
      <span className="text-sm font-semibold text-ink">OrderFlow Demo Business</span>
      <div className="relative ml-4 flex-1 max-w-md">
        <IconSearch
          size={18}
          stroke={1.75}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
          aria-hidden="true"
        />
        <input
          type="search"
          placeholder="Search (placeholder)"
          className="h-9 w-full rounded-md border border-line bg-canvas pl-9 pr-3 text-sm outline-offset-2 focus-visible:outline-2 focus-visible:outline-brand"
        />
      </div>
      <button
        type="button"
        className="inline-flex h-9 items-center gap-2 rounded-md bg-brand px-3 text-sm font-medium text-surface hover:bg-brand-hover"
      >
        <IconPlus size={18} stroke={1.75} aria-hidden="true" />
        Create
      </button>
      <button
        type="button"
        aria-label="Notifications"
        className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted hover:bg-canvas hover:text-ink"
      >
        <IconBell size={20} stroke={1.75} aria-hidden="true" />
      </button>
      <button
        type="button"
        aria-label="Account"
        className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted hover:bg-canvas hover:text-ink"
      >
        <IconUser size={20} stroke={1.75} aria-hidden="true" />
      </button>
    </header>
  );
}
