import type { Dictionary } from "@/lib/i18n";

export default function TrustSecurity({ copy }: { copy: Dictionary["trust"] }) {
  return <section id="trust" className="section-pad bg-[#101312] text-white"><div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.85fr_1fr] lg:items-center">
    <div className="section-reveal"><p className="eyebrow text-[#c6f36d]">{copy.kicker}</p><h2 className="section-title text-white">{copy.title}</h2><p className="mt-5 max-w-2xl leading-7 text-white/68">{copy.body}</p></div>
    <div className="grid gap-3 sm:grid-cols-2">{copy.points.map((point) => <div key={point} className="section-reveal rounded-2xl border border-white/12 bg-white/[.06] p-5"><div className="mb-5 h-2 w-12 rounded-full bg-[#c6f36d]" /><p className="text-lg font-semibold">{point}</p></div>)}</div>
  </div></section>;
}
