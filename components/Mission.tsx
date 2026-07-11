import type { Dictionary } from "@/lib/i18n";

export default function Mission({ copy }: { copy: Dictionary["mission"] }) {
  return <section id="mission" className="section-pad overflow-hidden bg-white"><div className="section-reveal relative mx-auto max-w-7xl rounded-[2rem] bg-[#dff1df] px-6 py-14 sm:px-12 lg:px-16 lg:py-20">
    <div className="absolute -right-24 -top-32 h-80 w-80 rounded-full border-[54px] border-[#c6f36d]/50" aria-hidden="true" />
    <div className="relative max-w-4xl"><p className="eyebrow text-[#277a43]">{copy.kicker}</p><h2 className="mt-4 text-4xl font-semibold leading-tight tracking-[-.03em] sm:text-6xl">{copy.title}</h2><p className="body-copy mt-6 max-w-3xl text-lg">{copy.body}</p></div>
  </div></section>;
}
