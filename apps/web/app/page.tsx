import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

import { checkOnboardingRedirect } from "@calcom/features/auth/lib/onboardingUtils";
import { getServerSession } from "@calcom/features/auth/lib/getServerSession";

import { buildLegacyRequest } from "@lib/buildLegacyCtx";

const features = [
  {
    icon: "⚡",
    title: "Instant booking links",
    desc: "Share your link, let people book in seconds. No back-and-forth emails.",
  },
  {
    icon: "🗓️",
    title: "Calendar sync",
    desc: "Connects to Google, Outlook, and Apple Calendar. Never get double-booked.",
  },
  {
    icon: "🏢",
    title: "Team scheduling",
    desc: "Round-robin, collective, or fixed hosts. Built for teams of any size.",
  },
  {
    icon: "🌍",
    title: "Timezone aware",
    desc: "Every booking auto-converts to the guest's timezone. Zero confusion.",
  },
  {
    icon: "🔗",
    title: "Workflow automation",
    desc: "Send reminders, follow-ups, and confirmations automatically.",
  },
  {
    icon: "🎨",
    title: "White-label ready",
    desc: "Your brand, your domain. MeetSynq disappears into the background.",
  },
];

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
    <div className="min-h-screen bg-white text-gray-900 antialiased">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-xl font-bold tracking-tight text-gray-900">
            MeetSynq
          </Link>
          <nav className="hidden items-center gap-8 text-sm font-medium text-gray-600 md:flex">
            <Link href="#features" className="hover:text-gray-900 transition-colors">Features</Link>
            <Link href="#how-it-works" className="hover:text-gray-900 transition-colors">How it works</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link
              href="/auth/login"
              className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors">
              Sign in
            </Link>
            <Link
              href="/auth/login"
              className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 transition-colors">
              Get started free
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden px-6 pb-24 pt-20 text-center">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 via-white to-white" />
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
            Scheduling that just works
          </div>
          <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight text-gray-900 md:text-6xl">
            Meet smarter.<br />
            <span className="text-blue-600">Book faster.</span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-gray-500">
            MeetSynq is the open scheduling platform that replaces Calendly.
            Share a link, sync your calendar, and let people book time with you — automatically.
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/auth/login"
              className="rounded-xl bg-gray-900 px-7 py-3.5 text-base font-semibold text-white shadow-lg hover:bg-gray-700 transition-all hover:shadow-xl">
              Start for free →
            </Link>
            <Link
              href="/auth/login"
              className="rounded-xl border border-gray-200 bg-white px-7 py-3.5 text-base font-semibold text-gray-700 hover:border-gray-300 hover:bg-gray-50 transition-all">
              Sign in to your account
            </Link>
          </div>
          <p className="mt-4 text-sm text-gray-400">No credit card required · Free forever plan</p>
        </div>

        {/* Mock booking UI */}
        <div className="mx-auto mt-16 max-w-md overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl shadow-gray-200/60 text-left">
          <div className="border-b border-gray-100 bg-gray-50 px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">MS</div>
              <div>
                <p className="text-sm font-semibold text-gray-900">30 Min Meeting</p>
                <p className="text-xs text-gray-500">meetsynq.com/alex/30min</p>
              </div>
            </div>
          </div>
          <div className="px-6 py-5">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-400">Select a date</p>
            <div className="grid grid-cols-7 gap-1 text-center text-xs">
              {["M","T","W","T","F","S","S"].map((d, i) => (
                <div key={i} className="py-1 font-medium text-gray-400">{d}</div>
              ))}
              {[null,null,"17","18","19","20","21"].map((d, i) => (
                <div key={i} className={`rounded-lg py-2 font-medium ${d === "18" ? "bg-blue-600 text-white" : d ? "cursor-pointer text-gray-700 hover:bg-blue-50" : ""}`}>{d}</div>
              ))}
              {["22","23","24","25","26","27","28"].map((d, i) => (
                <div key={i} className="cursor-pointer rounded-lg py-2 font-medium text-gray-700 hover:bg-blue-50">{d}</div>
              ))}
            </div>
            <div className="mt-4 flex gap-2">
              {["9:00am","9:30am","10:00am"].map((t) => (
                <div key={t} className={`flex-1 rounded-lg border py-2 text-center text-xs font-medium ${t === "9:30am" ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-200 text-gray-600"}`}>{t}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-gray-50 px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
              Everything you need to schedule
            </h2>
            <p className="mt-4 text-lg text-gray-500">Built for individuals and teams who value their time.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="rounded-2xl border border-gray-200 bg-white p-6 hover:border-blue-200 hover:shadow-md transition-all">
                <div className="mb-4 text-3xl">{f.icon}</div>
                <h3 className="mb-2 text-base font-semibold text-gray-900">{f.title}</h3>
                <p className="text-sm leading-relaxed text-gray-500">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <div className="mb-14 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">Up in 2 minutes</h2>
            <p className="mt-4 text-lg text-gray-500">No complex setup. No waiting for approval.</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { step: "1", title: "Create your account", desc: "Sign up free. Connect your calendar in one click." },
              { step: "2", title: "Set your availability", desc: "Tell us when you're free. We handle the rest." },
              { step: "3", title: "Share your link", desc: "Send your booking link. People pick a time. Done." },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white">
                  {s.step}
                </div>
                <h3 className="mb-2 font-semibold text-gray-900">{s.title}</h3>
                <p className="text-sm leading-relaxed text-gray-500">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-900 px-6 py-20 text-center text-white">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            Ready to stop playing email tag?
          </h2>
          <p className="mb-8 text-lg text-gray-400">
            Join thousands of people who use MeetSynq to book smarter.
          </p>
          <Link
            href="/auth/login"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-semibold text-gray-900 hover:bg-gray-100 transition-colors">
            Get started free →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white px-6 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-gray-400 md:flex-row">
          <p className="font-semibold text-gray-900">MeetSynq</p>
          <p>© {new Date().getFullYear()} MeetSynq. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/auth/login" className="hover:text-gray-700 transition-colors">Sign in</Link>
            <Link href="/auth/login" className="hover:text-gray-700 transition-colors">Sign up</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
