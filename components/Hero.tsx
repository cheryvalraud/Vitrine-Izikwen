import ThreeScene from "@/components/ThreeScene";

const highlights = [
  ["Digital value", "Wallet-ready"],
  ["Local payouts", "Market-aware"],
  ["Support", "Human path"],
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative isolate flex min-h-[calc(100svh-4rem)] items-center bg-[#07111f] px-4 pb-12 pt-14 text-white sm:px-6 sm:pb-16 sm:pt-20 lg:pt-24"
    >
      <div className="ledger-grid absolute inset-0 -z-20 opacity-30" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(120deg,rgba(7,17,31,0.98),rgba(7,17,31,0.94)_52%,rgba(13,26,43,0.9)),radial-gradient(circle_at_76%_24%,rgba(39,214,195,0.14),transparent_31%),radial-gradient(circle_at_18%_82%,rgba(244,209,135,0.12),transparent_27%)]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-28 bg-gradient-to-b from-transparent to-[#f6f2ea]" />

      <div className="mx-auto grid w-full max-w-[358px] items-center gap-10 sm:max-w-6xl lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
        <div className="hero-copy max-w-2xl">
          <div className="mb-6 inline-flex items-center rounded-full border border-white/12 bg-white/[0.06] px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#d7c49a]">
            EasyCoin by Izikwen
          </div>

          <h1 className="max-w-3xl text-balance text-4xl font-semibold leading-[1.02] tracking-[-0.03em] text-white sm:text-6xl sm:leading-[0.98] lg:text-7xl">
            Move digital money with clarity.
          </h1>

          <p className="mt-6 max-w-xl text-pretty text-lg leading-8 text-[#c7d2df] sm:text-xl">
            EasyCoin helps customers move between digital value, local payment
            methods, and supported payout options with a clean support path when
            help is needed.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="mailto:contact@comercializikwen.com?subject=Izikwen%20support"
              className="inline-flex h-12 items-center justify-center rounded-full bg-[#f4d187] px-6 text-base font-semibold text-[#07111f] shadow-[0_18px_50px_rgba(244,209,135,0.2)] transition hover:-translate-y-0.5 hover:bg-[#ffe1a3]"
            >
              Contact support
            </a>
            <a
              href="#flow"
              className="inline-flex h-12 items-center justify-center rounded-full border border-white/14 bg-white/[0.06] px-6 text-base font-semibold text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/12"
            >
              See how it works
            </a>
          </div>

          <div className="mt-8 grid max-w-xl grid-cols-1 gap-2 sm:grid-cols-3">
            {highlights.map(([label, value]) => (
              <div
                key={label}
                className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.04] p-3"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8ea0b4]">
                  {label}
                </p>
                <p className="mt-2 text-sm font-semibold text-white">{value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-visual relative min-h-[340px] overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] shadow-[0_34px_100px_rgba(0,0,0,0.22)] sm:min-h-[500px] lg:min-h-[620px]">
          <ThreeScene />
        </div>
      </div>
    </section>
  );
}
