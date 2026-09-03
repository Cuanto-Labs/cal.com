import {
  SUPPORT_MAIL_ADDRESS,
  WEBAPP_URL,
  WEBSITE_PRIVACY_POLICY_URL,
  WEBSITE_TERMS_URL,
} from "@calcom/lib/constants";
import Link from "next/link";
import type { ReactNode } from "react";
import { displayFont, monoFont } from "./fonts";
import styles from "./marketing.module.css";
import { Wordmark } from "./Wordmark";

export type NavKey = "product" | "agencies" | "pricing";

const navLinks: { key: NavKey; href: string; label: string }[] = [
  { key: "product", href: "/#product", label: "Product" },
  { key: "agencies", href: "/white-label", label: "For agencies" },
  { key: "pricing", href: "/pricing", label: "Pricing" },
];

type FooterLink = { label: string; href: string; external?: boolean };

function FooterColumn({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <div>
      <p className={`${styles.mono} text-[11px] uppercase tracking-[0.14em] text-(--ms-slate)`}>{title}</p>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.label}>
            {l.external ? (
              <a href={l.href} className="text-sm text-(--ms-ink) hover:text-(--ms-orange)">
                {l.label}
              </a>
            ) : (
              <Link href={l.href} className="text-sm text-(--ms-ink) hover:text-(--ms-orange)">
                {l.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function MarketingShell({ children, active }: { children: ReactNode; active?: NavKey }) {
  const host = new URL(WEBAPP_URL).host;
  const supportMailto = `mailto:${SUPPORT_MAIL_ADDRESS}`;

  return (
    <div className={`${styles.shell} ${displayFont.variable} ${monoFont.variable} min-h-screen antialiased`}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-(--ms-ink) focus:px-3 focus:py-2 focus:text-sm focus:text-white">
        Skip to content
      </a>

      <header className="sticky top-0 z-50 border-b border-(--ms-line) bg-white/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
          <Link
            href="/"
            aria-label="MeetSynq home"
            className="rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--ms-orange)">
            <Wordmark />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
            {navLinks.map((l) => {
              const isActive = active === l.key;
              return (
                <Link
                  key={l.key}
                  href={l.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--ms-orange) ${
                    isActive ? "bg-(--ms-fog) text-(--ms-ink)" : "text-(--ms-slate) hover:text-(--ms-ink)"
                  }`}>
                  {l.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/auth/login"
              className="hidden rounded-full px-3.5 py-2 text-sm font-medium text-(--ms-slate) hover:text-(--ms-ink) sm:inline-flex">
              Sign in
            </Link>
            <Link href="/signup" className={`${styles.btn} ${styles.btnPrimary}`}>
              Get started
            </Link>
          </div>
        </div>
      </header>

      <main id="main">{children}</main>

      <footer className="border-t border-(--ms-line) bg-(--ms-fog)">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Wordmark />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-(--ms-slate)">
              Scheduling for people and teams, and the white-label platform agencies put their own name on.
            </p>
          </div>
          <FooterColumn
            title="Product"
            links={[
              { label: "Features", href: "/#product" },
              { label: "How it works", href: "/#how" },
              { label: "Pricing", href: "/pricing" },
              { label: "Sign in", href: "/auth/login" },
            ]}
          />
          <FooterColumn
            title="Agencies"
            links={[
              { label: "White-label", href: "/white-label" },
              { label: "Talk to us", href: supportMailto, external: true },
            ]}
          />
          <FooterColumn
            title="Company"
            links={[
              { label: "Support", href: supportMailto, external: true },
              { label: "Terms", href: WEBSITE_TERMS_URL, external: true },
              { label: "Privacy", href: WEBSITE_PRIVACY_POLICY_URL, external: true },
            ]}
          />
        </div>
        <div className="border-t border-(--ms-line)">
          <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-6 text-xs text-(--ms-slate) sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <p>© {new Date().getFullYear()} MeetSynq. A Cuanto Labs product.</p>
            <p className={styles.mono}>{host}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
