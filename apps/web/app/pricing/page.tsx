import { APP_NAME, WEBAPP_URL } from "@calcom/lib/constants";
import type { Metadata } from "next";
import Link from "next/link";
import { MarketingShell } from "~/marketing/MarketingShell";
import styles from "~/marketing/marketing.module.css";
import { enterprise, tiers, whiteLabelMailto } from "~/marketing/pricing-data";

const title = `Pricing | ${APP_NAME}`;
const description =
  "Per-seat pricing for individuals and teams, a volume plan for agencies, and a dedicated white-label deployment for companies that want scheduling under their own name.";

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL(WEBAPP_URL),
  openGraph: {
    title,
    description,
    url: `${WEBAPP_URL}/pricing`,
    siteName: APP_NAME,
    images: [`${WEBAPP_URL}/og-image.png`],
    type: "website",
  },
  twitter: { card: "summary_large_image", title, description, images: [`${WEBAPP_URL}/og-image.png`] },
};

const faqs = [
  {
    q: "What counts as a user?",
    a: "Anyone who can be booked. Guests who book time with you never need an account and are never counted.",
  },
  {
    q: "Can I change plans later?",
    a: "Yes. Upgrades apply immediately, downgrades at the end of the billing period. Nothing is lost either way.",
  },
  {
    q: "What does the free trial include?",
    a: "The full Team plan for 14 days, with no card on file. Pick a plan when it ends, or keep using the Starter features.",
  },
  {
    q: "How is white-label different from the Agency plan?",
    a: "Agency runs on MeetSynq's domain with a workspace per client. White-label is a separate deployment on your domain, carrying only your brand.",
  },
];

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      width="16"
      height="16"
      fill="none"
      aria-hidden="true"
      className="mt-0.5 shrink-0">
      <path
        d="m5 10.5 3 3 7-7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const PricingPage = () => {
  return (
    <MarketingShell active="pricing">
      <section className="mx-auto max-w-6xl px-5 pb-12 pt-14 sm:px-8 lg:pt-20">
        <p className={`${styles.mono} text-[11px] uppercase tracking-[0.16em] text-(--ms-slate)`}>Pricing</p>
        <h1
          className={`${styles.display} mt-4 max-w-3xl text-[3rem] font-bold leading-[0.98] text-(--ms-ink) sm:text-6xl`}>
          Pay per seat. Nothing hidden.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-(--ms-slate)">
          Every plan includes unlimited bookings and every calendar we connect to. Pick by how many people get
          booked and how much of the routing you need.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20 sm:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          {tiers.map((t) => {
            const dark = t.highlighted;
            const isExternal = t.href.startsWith("mailto:");
            const btnClass = `${styles.btn} ${dark ? styles.btnOnDark : styles.btnPrimary} mt-8 w-full`;
            return (
              <div
                key={t.name}
                className={`flex flex-col rounded-3xl border p-7 ${
                  dark ? "border-(--ms-ink) bg-(--ms-ink) text-white" : "border-(--ms-line) bg-white"
                }`}>
                <div className="flex items-center justify-between">
                  <p
                    className={`${styles.mono} text-[11px] uppercase tracking-[0.14em] ${
                      dark ? "text-white/60" : "text-(--ms-slate)"
                    }`}>
                    {t.name}
                  </p>
                  {dark && (
                    <span
                      className={`${styles.mono} rounded-full bg-(--ms-teal) px-2 py-0.5 text-[10px] font-medium text-(--ms-ink)`}>
                      Most teams
                    </span>
                  )}
                </div>
                <p className="mt-4 flex items-baseline gap-2">
                  <span className={`${styles.display} text-5xl font-bold leading-none`}>{t.price}</span>
                  <span className={`text-sm ${dark ? "text-white/60" : "text-(--ms-slate)"}`}>{t.unit}</span>
                </p>
                {t.sub && (
                  <p
                    className={`${styles.mono} mt-2 text-xs ${dark ? "text-white/60" : "text-(--ms-slate)"}`}>
                    {t.sub}
                  </p>
                )}
                <p
                  className={`mt-4 text-[15px] leading-relaxed ${dark ? "text-white/75" : "text-(--ms-slate)"}`}>
                  {t.desc}
                </p>
                <ul className="mt-6 space-y-2.5 text-sm">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <span className={dark ? "text-(--ms-teal)" : "text-(--ms-orange)"}>
                        <CheckIcon />
                      </span>
                      <span className={dark ? "text-white/85" : "text-(--ms-ink)"}>{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto">
                  {isExternal ? (
                    <a href={t.href} className={btnClass}>
                      {t.cta}
                    </a>
                  ) : (
                    <Link href={t.href} className={btnClass}>
                      {t.cta}
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 grid gap-8 rounded-3xl bg-(--ms-fog) p-7 md:grid-cols-[1.2fr_1fr] md:p-10">
          <div>
            <p className={`${styles.mono} text-[11px] uppercase tracking-[0.14em] text-(--ms-slate)`}>
              {enterprise.name}
            </p>
            <h2 className={`${styles.display} mt-3 text-3xl font-bold leading-tight text-(--ms-ink)`}>
              Scheduling that wears your name.
            </h2>
            <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-(--ms-slate)">{enterprise.desc}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={whiteLabelMailto} className={`${styles.btn} ${styles.btnPrimary}`}>
                Request a quote
              </a>
              <Link href="/white-label" className={`${styles.btn} ${styles.btnSecondary}`}>
                How white-label works
              </Link>
            </div>
          </div>
          <ul className="grid gap-2.5 text-sm text-(--ms-ink) sm:grid-cols-2 md:grid-cols-1">
            {enterprise.bullets.map((b) => (
              <li key={b} className="flex items-start gap-2">
                <span className="text-(--ms-teal)">
                  <CheckIcon />
                </span>
                {b}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-(--ms-line)">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[1fr_1.6fr]">
          <h2 className={`${styles.display} text-3xl font-bold leading-tight text-(--ms-ink) sm:text-4xl`}>
            Questions people ask before they pick.
          </h2>
          <dl className="divide-y divide-(--ms-line)">
            {faqs.map((f) => (
              <div key={f.q} className="py-5 first:pt-0 last:pb-0">
                <dt className="text-base font-semibold text-(--ms-ink)">{f.q}</dt>
                <dd className="mt-1.5 text-[15px] leading-relaxed text-(--ms-slate)">{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </MarketingShell>
  );
};

export default PricingPage;
