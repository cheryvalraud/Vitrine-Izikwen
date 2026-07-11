import type { Dictionary } from "@/lib/i18n";

export default function FAQ({ copy }: { copy: Dictionary["faq"] }) {
  return <section id="faq" className="section-pad bg-[#f8f7f2]"><div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.7fr_1fr]">
    <div className="section-reveal"><p className="eyebrow text-[#277a43]">{copy.kicker}</p><h2 className="section-title">{copy.title}</h2></div>
    <div className="section-reveal divide-y divide-black/10 border-y border-black/10">{copy.items.map((item, index) => <details key={item.question} className="faq-item group py-5" open={index === 0}><summary className="focus-ring flex cursor-pointer list-none items-center justify-between gap-6 rounded text-lg font-semibold"><span>{item.question}</span><span className="text-2xl text-[#277a43] transition group-open:rotate-45" aria-hidden="true">+</span></summary><p className="body-copy max-w-2xl pb-1 pt-4">{item.answer}</p></details>)}</div>
  </div></section>;
}
