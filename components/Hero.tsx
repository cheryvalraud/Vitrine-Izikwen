import Image from "next/image";
import ThreeScene from "@/components/ThreeScene";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative isolate flex min-h-[88svh] items-center px-4 pb-4 pt-24 sm:px-6 sm:pb-16 sm:pt-28 lg:pt-32"
    >
      <Image
        src="/images/izikwen-hero-background.jpeg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="pointer-events-none -z-20 object-cover opacity-70"
      />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_76%_20%,rgba(255,255,255,0.55),transparent_28%),linear-gradient(90deg,rgba(251,255,253,0.98),rgba(251,255,253,0.86)_43%,rgba(240,255,247,0.6))]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent to-[#fbfffd]" />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-5 sm:gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-6">
        <div className="max-w-2xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-md border border-emerald-500/20 bg-white/75 px-3 py-2 text-sm font-medium text-emerald-700 shadow-sm backdrop-blur sm:mb-7">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            EasyCoin by Izikwen
          </div>

          <h1 className="max-w-3xl text-balance text-5xl font-semibold leading-[1.02] tracking-normal text-slate-950 sm:text-6xl lg:text-7xl">
            Move money with clarity.
          </h1>

          <p className="mt-5 max-w-xl text-pretty text-lg leading-8 text-slate-600 sm:mt-6 sm:text-xl">
            EasyCoin helps people move between digital value, local payment
            options, and supported payout methods through a simple mobile-first
            experience.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row">
            <a
              href="mailto:support@example.com?subject=Izikwen%20EasyCoin%20waitlist"
              className="inline-flex h-12 items-center justify-center rounded-md bg-emerald-500 px-6 text-base font-semibold text-white shadow-[0_14px_34px_rgba(16,185,129,0.26)] transition hover:bg-emerald-600"
            >
              Join the waitlist
            </a>
            <a
              href="#support"
              className="inline-flex h-12 items-center justify-center rounded-md border border-slate-200 bg-white/80 px-6 text-base font-semibold text-slate-900 shadow-sm backdrop-blur transition hover:border-emerald-500/35 hover:bg-white"
            >
              Contact support
            </a>
          </div>

          <p className="mt-6 max-w-xl text-sm leading-6 text-slate-500 sm:mt-7">
            Designed for clear review steps, verification, and human support
            when it matters.
          </p>
        </div>

        <div className="relative min-h-[140px] sm:min-h-[460px] lg:min-h-[600px]">
          <ThreeScene />
          <div className="absolute bottom-1 left-1/2 grid w-[min(92%,420px)] -translate-x-1/2 grid-cols-3 gap-2 rounded-lg border border-white/70 bg-white/64 p-2 text-center text-xs font-semibold text-slate-600 shadow-[0_18px_60px_rgba(15,23,42,0.10)] backdrop-blur-xl sm:bottom-2 sm:text-sm">
            <span className="rounded-md bg-white/70 px-2 py-2">Verify</span>
            <span className="rounded-md bg-white/70 px-2 py-2">Review</span>
            <span className="rounded-md bg-white/70 px-2 py-2">Complete</span>
          </div>
        </div>
      </div>
    </section>
  );
}
