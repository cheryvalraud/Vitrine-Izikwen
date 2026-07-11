import type { Dictionary } from "@/lib/i18n";

const assets = [["BTC", "Bitcoin"], ["ETH", "Ethereum"], ["USDT", "Tether"]];

export default function SupportedAssets({ copy }: { copy: Dictionary["assets"] }) {
  return <section id="assets" className="section-pad bg-[#f8f7f2]"><div className="mx-auto max-w-7xl">
    <div className="section-reveal grid gap-8 lg:grid-cols-[.9fr_1fr] lg:items-end"><div><p className="eyebrow text-[#277a43]">{copy.kicker}</p><h2 className="section-title">{copy.title}</h2></div><div><p className="body-copy">{copy.body}</p><p className="mt-3 text-sm font-medium text-[#39423d]">{copy.availability}</p></div></div>
    <div className="mt-12 grid gap-4 sm:grid-cols-3">{assets.map(([ticker, name]) => <article key={ticker} className="section-reveal card p-6"><p className="text-4xl font-semibold">{ticker}</p><p className="mt-3 font-medium text-[#59615c]">{name}</p></article>)}</div>
  </div></section>;
}
