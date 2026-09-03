import { APP_NAME, WEBAPP_URL } from "@calcom/lib/constants";
import type { Metadata } from "next";
import Link from "next/link";
import { MarketingShell } from "~/marketing/MarketingShell";
import styles from "~/marketing/marketing.module.css";
import { whiteLabelMailto } from "~/marketing/pricing-data";

const title = `White-label scheduling for agencies | ${APP_NAME}`;
const description =
  "Deploy MeetSynq under your own brand: your logo, your name, your domain. Scheduling infrastructure agencies and companies hand to clients as their own.";

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL(WEBAPP_URL),
  openGraph: {
    title,
    description,
    url: `${WEBAPP_URL}/white-label`,
    siteName: APP_NAME,
    images: [`${WEBAPP_URL}/og-image.png`],
    type: "website",
  },
  twitter: { card: "summary_large_image", title, description, images: [`${WEBAPP_URL}/og-image.png`] },
};

const swaps = [
  { label: "App name", ours: "MeetSynq", yours: "Northwind Booking" },
  { label: "Domain", ours: "meet.cuantolabs.com", yours: "book.northwind.law" },
  { label: "Email sender", ours: "MeetSynq <hello@…>", yours: "Northwind <hello@northwind.law>" },
  { label: "Logo and favicon", ours: "Two circles", yours: "Your mark" },
  { label: "Booking page footer", ours: "MeetSynq", yours: "Nothing, or your line" },
];

const capabilities = [
  {
    title: "Your name everywhere",
    desc: "App name, company name, and every email sender are set per deployment. No “powered by” unless you ask for it.",
  },
  {
    title: "Your logo and icon set",
    desc: "Wordmark, favicon, PWA icons, and email logo swap out per brand. What you see on MeetSynq itself is what your clients get.",
  },
  {
    title: "Your domain",
    desc: "Runs on a domain you control, a subdomain of your site or a dedicated one. Nothing in the product points back to us.",
  },
  {
    title: "Attribution off",
    desc: "A per-workspace setting strips remaining attribution from booking pages for clients who need a fully white-glove look.",
  },
  {
    title: "Real scheduling underneath",
    desc: "Calendar sync for Google, Outlook, and Apple, team and round-robin booking, intake forms, Stripe payments. Not a stripped demo.",
  },
  {
    title: "Your data stays yours",
    desc: "Each deployment has its own database. Export at any time, and move it wherever you like.",
  },
];

const audiences = [
  {
    title: "Marketing and web agencies",
    desc: "Bundle branded booking pages into client deliverables instead of pointing clients at someone else's tool.",
  },
  {
    title: "Consultancies and studios",
    desc: "Give every client-facing person a booking link that matches the firm, not a vendor.",
  },
  {
    title: "Software companies",
    desc: "Put scheduling inside your own product under your own name without building a calendar engine.",
  },
];

const process = [
  {
    title: "Send the brief",
    desc: "Brand assets, domain, sender address, and who needs seats. One email is enough.",
  },
  {
    title: "We deploy",
    desc: "Cuanto Labs stands up the instance, connects the domain, and applies the brand. Usually within a few business days.",
  },
  {
    title: "You launch",
    desc: "Invite your people, connect calendars, share links. We handle updates and upkeep from here.",
  },
];

const WhiteLabelPage = () => {
  return (
    <MarketingShell active="agencies">
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 pt-14 sm:px-8 lg:grid-cols-[1fr_1fr] lg:pt-20">
        <div>
          <p className={`${styles.mono} text-[11px] uppercase tracking-[0.16em] text-(--ms-slate)`}>
            White-label
          </p>
          <h1
            className={`${styles.display} mt-4 text-[3rem] font-bold leading-[0.98] text-(--ms-ink) sm:text-6xl`}>
            Scheduling that wears your name.
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-(--ms-slate)">
            A dedicated MeetSynq deployment on your domain, with your logo, colors, and sender address. Your
            clients see you. They never see us.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={whiteLabelMailto} className={`${styles.btn} ${styles.btnPrimary} ${styles.btnLarge}`}>
              Request a quote
            </a>
            <Link href="/pricing" className={`${styles.btn} ${styles.btnSecondary} ${styles.btnLarge}`}>
              See pricing
            </Link>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-(--ms-line) bg-white" aria-hidden="true">
          <div className="grid grid-cols-[1fr_1fr] sm:grid-cols-3 border-b border-(--ms-line) bg-(--ms-fog) px-5 py-3">
            <span className={`${styles.mono} text-[10px] uppercase tracking-[0.14em] text-(--ms-slate)`}>
              Setting
            </span>
            <span
              className={`${styles.mono} text-[10px] uppercase tracking-[0.14em] text-(--ms-slate) hidden sm:inline`}>
              Ours
            </span>
            <span className={`${styles.mono} text-[10px] uppercase tracking-[0.14em] text-(--ms-orange)`}>
              Yours
            </span>
          </div>
          <ul className="divide-y divide-(--ms-line)">
            {swaps.map((s) => (
              <li
                key={s.label}
                className="grid grid-cols-[1fr_1fr] sm:grid-cols-3 gap-3 px-5 py-3.5 text-[13px]">
                <span className="font-medium text-(--ms-ink)">{s.label}</span>
                <span className="hidden text-(--ms-slate) line-through decoration-(--ms-line) sm:inline">
                  {s.ours}
                </span>
                <span className={`${styles.mono} break-words text-(--ms-ink)`}>{s.yours}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-(--ms-fog)">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
          <div className="max-w-2xl">
            <p className={`${styles.mono} text-[11px] uppercase tracking-[0.16em] text-(--ms-slate)`}>
              What changes
            </p>
            <h2
              className={`${styles.display} mt-4 text-4xl font-bold leading-[1.02] text-(--ms-ink) sm:text-5xl`}>
              Everything a client could see.
            </h2>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((c) => (
              <div key={c.title} className="rounded-2xl bg-white p-6">
                <h3 className={`${styles.display} text-xl font-semibold leading-tight text-(--ms-ink)`}>
                  {c.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-(--ms-slate)">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div>
            <p className={`${styles.mono} text-[11px] uppercase tracking-[0.16em] text-(--ms-slate)`}>
              How a deployment goes
            </p>
            <h2
              className={`${styles.display} mt-4 text-4xl font-bold leading-[1.02] text-(--ms-ink) sm:text-5xl`}>
              Three steps. One of them is yours.
            </h2>
          </div>
          <ol className="relative space-y-8 border-l border-(--ms-line) pl-8">
            {process.map((s, i) => (
              <li key={s.title} className="relative">
                <span
                  className={`${styles.mono} absolute -left-8 top-0.5 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full bg-(--ms-ink) text-[11px] font-medium text-white`}>
                  {i + 1}
                </span>
                <h3 className={`${styles.display} text-2xl font-semibold leading-tight text-(--ms-ink)`}>
                  {s.title}
                </h3>
                <p className="mt-2 max-w-md text-[15px] leading-relaxed text-(--ms-slate)">{s.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-(--ms-line)">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <h2 className={`${styles.display} text-3xl font-bold leading-tight text-(--ms-ink) sm:text-4xl`}>
            Who this is for
          </h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {audiences.map((a) => (
              <div key={a.title}>
                <h3 className="text-base font-semibold text-(--ms-ink)">{a.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-(--ms-slate)">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-(--ms-ink) text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-8 px-5 py-20 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:py-24">
          <div>
            <h2 className={`${styles.display} text-4xl font-bold leading-[1.02] sm:text-5xl`}>
              Ready for your own instance?
            </h2>
            <p className="mt-4 max-w-lg text-[17px] leading-relaxed text-white/70">
              Tell us the brand and the domain. Cuanto Labs takes it from there.
            </p>
          </div>
          <a href={whiteLabelMailto} className={`${styles.btn} ${styles.btnOnDark} ${styles.btnLarge}`}>
            Request a quote
          </a>
        </div>
      </section>
    </MarketingShell>
  );
};

export default WhiteLabelPage;
