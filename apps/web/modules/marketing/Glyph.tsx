import type { ReactNode } from "react";

export type GlyphName = "link" | "calendar" | "rotate" | "globe" | "form" | "brand";

const ORANGE = "#FF6B35";
const TEAL = "#2DD4BF";

const paths: Record<GlyphName, ReactNode> = {
  link: (
    <>
      <path stroke="currentColor" d="M10 13a5 5 0 0 0 7.07 0l3-3a5 5 0 0 0-7.07-7.07l-1.5 1.5" />
      <path stroke={ORANGE} d="M14 11a5 5 0 0 0-7.07 0l-3 3a5 5 0 0 0 7.07 7.07l1.5-1.5" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2.5" stroke="currentColor" />
      <path stroke="currentColor" d="M3 10h18M8 3v4M16 3v4" />
      <path stroke={TEAL} d="m9 15.5 2 2 4-4.5" />
    </>
  ),
  rotate: (
    <>
      <path stroke="currentColor" d="M21 12a9 9 0 1 1-3-6.7" />
      <path stroke={ORANGE} d="M21 4v5h-5" />
      <circle cx="12" cy="12" r="2" fill={TEAL} stroke="none" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" stroke="currentColor" />
      <path stroke="currentColor" d="M3 12h18" />
      <path stroke={TEAL} d="M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0-18" />
    </>
  ),
  form: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="2.5" stroke="currentColor" />
      <path stroke="currentColor" d="M8 8h8M8 12h8" />
      <path stroke={ORANGE} d="M8 16h5" />
    </>
  ),
  brand: (
    <>
      <circle cx="9.5" cy="12" r="6" stroke={ORANGE} />
      <circle cx="14.5" cy="12" r="6" stroke={TEAL} />
    </>
  ),
};

export function Glyph({ name, className }: { name: GlyphName; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="28"
      height="28"
      fill="none"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}>
      {paths[name]}
    </svg>
  );
}
