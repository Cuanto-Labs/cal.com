import { getServerSession } from "@calcom/features/auth/lib/getServerSession";
import { checkOnboardingRedirect } from "@calcom/features/auth/lib/onboardingUtils";
import { APP_NAME, WEBAPP_URL } from "@calcom/lib/constants";
import { buildLegacyRequest } from "@lib/buildLegacyCtx";
import type { Metadata } from "next";
import { cookies, headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Glyph, type GlyphName } from "~/marketing/Glyph";
import { MarketingShell } from "~/marketing/MarketingShell";
import styles from "~/marketing/marketing.module.css";
import { OverlapHero } from "~/marketing/OverlapHero";
import { tiers, whiteLabelMailto } from "~/marketing/pricing-data";
import { LensMark } from "~/marketing/Wordmark";

const title = `${APP_NAME} — Find the overlap`;
const description =
  "MeetSynq finds the window that works for both calendars and books it. Booking links, team round-robin, intake forms, and a white-label platform agencies deploy under their own brand.";

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL(WEBAPP_URL),
  openGraph: {
    title,
    description,
    url: WEBAPP_URL,
    siteName: APP_NAME,
    images: [`${WEBAPP_URL}/og-image.png`],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [`${WEBAPP_URL}/og-image.png`],
  },
};

const integrations = ["Google Calendar", "Outlook", "Apple Calendar", "Google Meet", "Zoom", "Stripe"];

const features: { glyph: GlyphName; title: string; desc: string }[] = [
  {
    glyph: "link",
    title: "One link per meeting type",
    desc: "Guests pick from what's open on both sides. The invite lands on both calendars with the video link attached.",
  },
  {
    glyph: "calendar",
    title: "Calendar sync that blocks everything",
    desc: "Google, Outlook, and Apple Calendar. Busy time on any of them closes the slot everywhere.",
  },
  {
    glyph: "rotate",
    title: "Round-robin and collective",
    desc: "Send the booking to whoever is next, or require the whole group. You set the rule once.",
  },
  {
    glyph: "globe",
    title: "Every time zone, one clock",
    desc: "Guests see your hours in their time. No arithmetic, no “is that your 9 or mine?”",
  },
  {
    glyph: "form",
    title: "Ask before the call",
    desc: "Phone, context, budget, anything you need. Answers ride along inside the invite.",
  },
  {
    glyph: "brand",
    title: "Your brand, top to bottom",
    desc: "Logo, colors, sender name, and domain. For agencies, MeetSynq disappears entirely.",
  },
];

const steps = [
  {
    title: "Connect your calendar",
    desc: "Google, Outlook, or Apple. One click, and MeetSynq starts reading when you're busy.",
  },
  {
    title: "Set your hours",
    desc: "Working hours, buffers between meetings, and how far ahead people can book.",
  },
  {
    title: "Share your link",
    desc: "Guests choose from the overlap. Invite, video link, and reminders go out on their own.",
  },
];

const brands = [
  { name: "Northwind Legal", initial: "N", color: "#1F3A5F", meeting: "Consultation · 45 min" },
  { name: "Sol Studio", initial: "S", color: "#D9A400", meeting: "Discovery call · 30 min" },
  { name: "Harbor Health", initial: "H", color: "#1E8E6E", meeting: "Intake visit · 20 min" },
];

const slots = ["10:00", "10:30", "11:00"];

const LandingPage = async () => {
  const session = await getServerSession({ req: buildLegacyRequest(await headers(), await cookies()) });

  if (session?.user?.id) {
    const organizationId = session.user.profile?.organizationId ?? null;
    const onboardingPath = await checkOnboardingRedirect(session.user.id, {
      checkEmailVerification: true,
      organizationId,
    });
    if (onboardingPath) {
      redirect(onboardingPath);
    }
    redirect("/event-types");
  }

  return (
    <MarketingShell active="product">
      {/* Hero */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 pt-14 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:gap-8 lg:pb-28 lg:pt-20">
        <div>
          <p className={`${styles.mono} text-[11px] uppercase tracking-[0.16em] text-(--ms-slate)`}>
            Scheduling · Teams · White-label
          </p>
          <h1
            className={`${styles.display} mt-5 text-[3.25rem] font-bold leading-[0.95] text-(--ms-ink) sm:text-[4.25rem] lg:text-[5rem]`}>
            Find the
            <br />
            overlap.
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-(--ms-slate)">
            Two calendars, one shared window. MeetSynq finds it, books it, and puts the invite on both sides.
            On your domain, in your brand.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/signup" className={`${styles.btn} ${styles.btnPrimary} ${styles.btnLarge}`}>
              Get started free
            </Link>
            <Link href="#how" className={`${styles.btn} ${styles.btnSecondary} ${styles.btnLarge}`}>
              See how it works
            </Link>
          </div>
          <p className="mt-4 text-sm text-(--ms-slate)">Free trial. No card needed.</p>
        </div>
        <div className="lg:pl-6">
          <OverlapHero />
        </div>
      </section>

      {/* Integrations */}
      <section className="border-y border-(--ms-line)">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-8 gap-y-3 px-5 py-5 sm:px-8">
          <span className={`${styles.mono} text-[11px] uppercase tracking-[0.14em] text-(--ms-slate)`}>
            Works with
          </span>
          {integrations.map((name) => (
            <span key={name} className="text-sm font-medium text-(--ms-ink)">
              {name}
            </span>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="product" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-20 sm:px-8 lg:py-28">
        <div className="max-w-2xl">
          <p className={`${styles.mono} text-[11px] uppercase tracking-[0.16em] text-(--ms-slate)`}>
            What you get
          </p>
          <h2
            className={`${styles.display} mt-4 text-4xl font-bold leading-[1.02] text-(--ms-ink) sm:text-5xl`}>
            Everything between “let's meet” and the meeting.
          </h2>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className={`${styles.tile} p-6`}>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-(--ms-ink) shadow-sm">
                <Glyph name={f.glyph} />
              </div>
              <h3 className={`${styles.display} mt-5 text-xl font-semibold leading-tight text-(--ms-ink)`}>
                {f.title}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-(--ms-slate)">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="scroll-mt-20 bg-(--ms-fog)">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
            <div>
              <p className={`${styles.mono} text-[11px] uppercase tracking-[0.16em] text-(--ms-slate)`}>
                How it works
              </p>
              <h2
                className={`${styles.display} mt-4 text-4xl font-bold leading-[1.02] text-(--ms-ink) sm:text-5xl`}>
                Live in a few minutes.
              </h2>
              <p className="mt-5 max-w-sm text-[17px] leading-relaxed text-(--ms-slate)">
                Three things to do once. After that, the link does the work and the calendar stays right.
              </p>
            </div>
            <ol className="relative space-y-8 border-l border-(--ms-line) pl-8">
              {steps.map((s, i) => (
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
        </div>
      </section>

      {/* Agencies */}
      <section className="bg-(--ms-ink) text-white">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
          <div className="grid items-end gap-10 lg:grid-cols-[1fr_1fr]">
            <div>
              <p className={`${styles.mono} text-[11px] uppercase tracking-[0.16em] text-white/55`}>
                For agencies
              </p>
              <h2 className={`${styles.display} mt-4 text-4xl font-bold leading-[1.02] sm:text-5xl`}>
                Your brand on the front.
                <br />
                Ours nowhere.
              </h2>
              <p className="mt-5 max-w-md text-[17px] leading-relaxed text-white/70">
                Deploy MeetSynq on a domain you control for each client, with their logo, colors, and sender
                name. The product never says MeetSynq unless you want it to.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/white-label" className={`${styles.btn} ${styles.btnOnDark} ${styles.btnLarge}`}>
                  See white-label
                </Link>
                <a
                  href={whiteLabelMailto}
                  className={`${styles.btn} ${styles.btnGhostDark} ${styles.btnLarge}`}>
                  Talk to us
                </a>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 lg:gap-3" aria-hidden="true">
              {brands.map((b, i) => (
                <div
                  key={b.name}
                  className={`rounded-2xl bg-white p-4 text-(--ms-ink) shadow-xl ${
                    i === 1 ? "lg:ml-12" : i === 2 ? "lg:ml-24" : ""
                  }`}>
                  <div className="flex items-center gap-3">
                    <span
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold text-white"
                      style={{ background: b.color }}>
                      {b.initial}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">{b.name}</p>
                      <p className={`${styles.mono} text-[11px] text-(--ms-slate)`}>{b.meeting}</p>
                    </div>
                  </div>
                  <div className="mt-3 grid grid-cols-3 gap-1.5">
                    {slots.map((t, j) => (
                      <span
                        key={t}
                        className={`${styles.mono} rounded-md border py-1.5 text-center text-[11px]`}
                        style={
                          j === 1
                            ? { background: b.color, borderColor: b.color, color: "#fff" }
                            : { borderColor: "#e6e8e8", color: "#5b6068" }
                        }>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing teaser */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className={`${styles.mono} text-[11px] uppercase tracking-[0.16em] text-(--ms-slate)`}>
              Pricing
            </p>
            <h2
              className={`${styles.display} mt-4 text-4xl font-bold leading-[1.02] text-(--ms-ink) sm:text-5xl`}>
              Pay per seat. Nothing hidden.
            </h2>
          </div>
          <Link href="/pricing" className={`${styles.btn} ${styles.btnSecondary}`}>
            Full pricing
          </Link>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`rounded-2xl border p-6 ${
                t.highlighted ? "border-(--ms-ink) bg-(--ms-ink) text-white" : "border-(--ms-line) bg-white"
              }`}>
              <p
                className={`${styles.mono} text-[11px] uppercase tracking-[0.14em] ${t.highlighted ? "text-white/60" : "text-(--ms-slate)"}`}>
                {t.name}
              </p>
              <p className="mt-3 flex items-baseline gap-2">
                <span className={`${styles.display} text-4xl font-bold leading-none`}>{t.price}</span>
                <span className={`text-sm ${t.highlighted ? "text-white/60" : "text-(--ms-slate)"}`}>
                  {t.unit}
                </span>
              </p>
              <p
                className={`mt-4 text-[15px] leading-relaxed ${t.highlighted ? "text-white/75" : "text-(--ms-slate)"}`}>
                {t.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-(--ms-fog)">
        <div className="mx-auto flex max-w-6xl flex-col items-center px-5 py-20 text-center sm:px-8 lg:py-28">
          <LensMark size={56} />
          <h2
            className={`${styles.display} mt-6 text-4xl font-bold leading-[1.02] text-(--ms-ink) sm:text-6xl`}>
            Find your overlap.
          </h2>
          <p className="mt-4 max-w-md text-[17px] leading-relaxed text-(--ms-slate)">
            Connect a calendar, share a link, and stop trading emails about times.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/signup" className={`${styles.btn} ${styles.btnPrimary} ${styles.btnLarge}`}>
              Get started free
            </Link>
            <Link href="/auth/login" className={`${styles.btn} ${styles.btnSecondary} ${styles.btnLarge}`}>
              Sign in
            </Link>
          </div>
        </div>
      </section>
    </MarketingShell>
  );
};

export default LandingPage;
