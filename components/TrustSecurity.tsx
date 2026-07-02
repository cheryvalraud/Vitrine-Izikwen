const safeguards = [
  "Cold storage custody for reserve holdings",
  "Multi-signature approval on every transfer",
  "Continuous transaction monitoring",
  "Independent review of security controls",
];

const principles = [
  {
    label: "Custody discipline",
    copy: "Assets are segregated and secured with the same discipline a private bank applies to physical vaults.",
  },
  {
    label: "Review-first transfers",
    copy: "Every movement of BTC, ETH, or USDT is checked before it settles, never assumed.",
  },
  {
    label: "Human accountability",
    copy: "A real support team stands behind every account, reachable when something needs attention.",
  },
];

export default function TrustSecurity() {
  return (
    <section
      id="trust"
      className="bg-[#07111f] px-4 py-16 text-white sm:px-6 lg:py-24"
      aria-labelledby="security-title"
    >
      <div className="mx-auto max-w-[358px] sm:max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#f4d187]">
              Trust &amp; security
            </p>
            <h2
              id="security-title"
              className="mt-3 text-3xl font-semibold tracking-[-0.02em] text-white sm:text-4xl"
            >
              Security built like a vault, not an app.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[#eef3f8]">
              Izikwen treats digital assets the way private banks treat
              reserves: guarded, verified, and never left to chance.
            </p>
          </div>

          <div className="grid gap-3 self-center">
            {safeguards.map((item) => (
              <div
                key={item}
                className="card-lift flex items-center gap-3 rounded-2xl border border-white/12 bg-white/[0.1] px-4 py-3 text-sm font-semibold text-white"
              >
                <span className="signal-dot h-2.5 w-2.5 shrink-0 rounded-full bg-[#27d6c3]" />
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {principles.map((item) => (
            <article
              key={item.label}
              className="card-lift relative overflow-hidden rounded-3xl border border-white/12 bg-white/[0.05] p-5"
            >
              <span className="motion-sheen" />
              <h3 className="relative text-lg font-semibold text-white">
                {item.label}
              </h3>
              <p className="relative mt-3 text-sm leading-6 text-[#c7d2df]">
                {item.copy}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
