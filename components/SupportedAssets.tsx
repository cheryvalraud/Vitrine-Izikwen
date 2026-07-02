const assets = [
  {
    ticker: "BTC",
    name: "Bitcoin",
    tagline: "The reserve asset.",
    copy: "Hold and move Bitcoin with custody controls built for long-term reserves.",
    accent: "#f4d187",
  },
  {
    ticker: "ETH",
    name: "Ethereum",
    tagline: "Programmable value.",
    copy: "Send and receive Ethereum with the same review-first discipline as every other asset.",
    accent: "#b4a7ff",
  },
  {
    ticker: "USDT",
    name: "Tether",
    tagline: "Stable, on demand.",
    copy: "Keep working capital in a stable asset without leaving the Izikwen vault.",
    accent: "#27d6c3",
  },
];

export default function SupportedAssets() {
  return (
    <section
      id="assets"
      className="bg-[#07111f] px-4 py-16 text-white sm:px-6 lg:py-24"
      aria-labelledby="assets-title"
    >
      <div className="mx-auto max-w-[358px] sm:max-w-6xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#f4d187]">
          Supported assets
        </p>
        <h2
          id="assets-title"
          className="mt-3 max-w-2xl text-3xl font-semibold tracking-[-0.02em] text-white sm:text-4xl"
        >
          A short list, held to a high standard.
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-7 text-[#c7d2df]">
          Izikwen supports the assets that matter most, with more added
          deliberately rather than quickly.
        </p>

        <div className="mt-9 grid gap-4 sm:grid-cols-3">
          {assets.map((asset) => (
            <article
              key={asset.ticker}
              className="card-lift group relative overflow-hidden rounded-3xl border border-white/12 bg-white/[0.05] p-6"
            >
              <span className="motion-sheen" />
              <div className="relative flex items-center justify-between">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-2xl text-sm font-bold text-[#07111f]"
                  style={{ backgroundColor: asset.accent }}
                >
                  {asset.ticker}
                </div>
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#9fb3c8]">
                  {asset.name}
                </span>
              </div>
              <h3 className="relative mt-6 text-lg font-semibold text-white">
                {asset.tagline}
              </h3>
              <p className="relative mt-3 text-sm leading-6 text-[#c7d2df]">
                {asset.copy}
              </p>
            </article>
          ))}
        </div>

        <p className="mt-6 text-xs font-medium uppercase tracking-[0.14em] text-[#7a889a]">
          More assets are added deliberately, not by default.
        </p>
      </div>
    </section>
  );
}
