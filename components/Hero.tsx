import ThreeScene from "@/components/ThreeScene";

const routeStats = [
  ["Authorization", "0.8s"],
  ["Settlement window", "T+0"],
  ["Support state", "Active"],
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative isolate flex min-h-[92svh] items-center bg-[#07111f] px-4 pb-12 pt-28 text-white sm:px-6 sm:pb-16 sm:pt-32 lg:pt-36"
    >
      <div className="ledger-grid absolute inset-0 -z-20 opacity-45" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(120deg,rgba(7,17,31,0.98),rgba(7,17,31,0.9)_48%,rgba(17,30,48,0.86)),radial-gradient(circle_at_76%_24%,rgba(39,214,195,0.18),transparent_31%),radial-gradient(circle_at_18%_82%,rgba(244,209,135,0.13),transparent_27%)]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-b from-transparent to-[#f6f2ea]" />

      <div className="mx-auto grid w-full max-w-[358px] items-center gap-10 sm:max-w-6xl lg:grid-cols-[0.88fr_1.12fr] lg:gap-6">
        <div className="hero-copy max-w-2xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-[8px] border border-white/12 bg-white/[0.05] px-3 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[#b8c6d6] backdrop-blur">
            <span className="signal-dot h-2 w-2 rounded-full bg-[#27d6c3]" />
            Private fintech preview
          </div>

          <h1 className="max-w-3xl text-balance text-4xl font-semibold leading-[1.02] tracking-normal text-white sm:text-6xl sm:leading-[0.98] lg:text-7xl">
            Izikwen payment rails for modern money movement.
          </h1>

          <p className="mt-6 max-w-xl text-pretty text-lg leading-8 text-[#c7d2df] sm:text-xl">
            A premium mobile-first platform for routing digital value through
            local payment paths, payout options, and support-aware review
            flows.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="mailto:support@example.com?subject=Izikwen%20private%20preview"
              className="inline-flex h-12 items-center justify-center rounded-[8px] bg-[#f4d187] px-6 text-base font-semibold text-[#07111f] shadow-[0_18px_50px_rgba(244,209,135,0.22)] transition hover:-translate-y-0.5 hover:bg-[#ffe1a3]"
            >
              Request access
            </a>
            <a
              href="#rails"
              className="inline-flex h-12 items-center justify-center rounded-[8px] border border-white/14 bg-white/[0.06] px-6 text-base font-semibold text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/12"
            >
              Explore rails
            </a>
          </div>

          <div className="mt-8 grid max-w-xl grid-cols-1 gap-2 sm:grid-cols-3">
            {routeStats.map(([label, value]) => (
              <div
                key={label}
                className="min-w-0 rounded-[8px] border border-white/10 bg-white/[0.04] p-3"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#8ea0b4]">
                  {label}
                </p>
                <p className="mt-2 text-sm font-semibold text-white">{value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-visual relative min-h-[360px] sm:min-h-[500px] lg:min-h-[630px]">
          <ThreeScene />

          <div className="absolute left-0 top-4 w-[min(72%,250px)] rounded-[8px] border border-white/12 bg-[#091624]/78 p-4 shadow-[0_24px_80px_rgba(0,0,0,0.22)] backdrop-blur-xl sm:left-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#8ea0b4]">
                Route
              </span>
              <span className="rounded-[6px] bg-[#27d6c3]/14 px-2 py-1 text-xs font-semibold text-[#7df7e8]">
                Verified
              </span>
            </div>
            <div className="mt-4 space-y-3 text-sm text-[#d9e3ee]">
              <div className="flex items-center justify-between">
                <span>Digital value</span>
                <span className="font-semibold text-white">Wallet</span>
              </div>
              <div className="relative h-1 overflow-hidden rounded-full bg-white/10">
                <span className="rail-scan absolute inset-y-0 left-0 w-3/5 rounded-full bg-[#27d6c3]" />
              </div>
              <div className="flex items-center justify-between">
                <span>Payout</span>
                <span className="font-semibold text-[#f4d187]">Ready</span>
              </div>
            </div>
          </div>

          <div className="absolute bottom-4 right-0 grid w-[min(88%,430px)] grid-cols-3 gap-2 sm:right-4">
            {["Verify", "Route", "Settle"].map((label) => (
              <span
                key={label}
                className="metric-tile rounded-[8px] border border-white/12 bg-white/[0.08] px-3 py-3 text-center text-xs font-semibold text-white shadow-[0_16px_60px_rgba(0,0,0,0.18)] backdrop-blur-xl sm:text-sm"
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
