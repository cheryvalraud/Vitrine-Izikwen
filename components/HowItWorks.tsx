import type { Dictionary } from "@/lib/i18n";

export default function HowItWorks({ copy }: { copy: Dictionary["how"] }) {
  return <section id="how" className="section-pad bg-white"><div className="mx-auto max-w-7xl">
    <div className="section-reveal max-w-2xl"><p className="eyebrow text-[#277a43]">{copy.kicker}</p><h2 className="section-title">{copy.title}</h2></div>
    <div className="mt-12 grid gap-4 md:grid-cols-3">{copy.steps.map((step, index) => <article key={step.title} className="section-reveal card p-6"><p className="text-sm font-semibold text-[#277a43]">{String(index + 1).padStart(2, "0")}</p><h3 className="mt-5 text-2xl font-semibold">{step.title}</h3><p className="body-copy mt-3">{step.copy}</p></article>)}</div>
  </div></section>;
}
