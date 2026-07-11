import type { Dictionary, Locale } from "@/lib/i18n";
import { accessMailto, contactMailto } from "@/lib/site";

export default function FinalCTA({ locale, copy }: { locale: Locale; copy: Dictionary["cta"] }) {
  return <section className="bg-[#f8f7f2] px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28"><div className="section-reveal mx-auto grid max-w-7xl gap-8 rounded-[2rem] bg-[#101312] p-8 text-white sm:p-12 lg:grid-cols-[1fr_auto] lg:items-center lg:p-16"><div><h2 className="text-3xl font-semibold sm:text-5xl">{copy.title}</h2><p className="mt-4 max-w-2xl leading-7 text-white/68">{copy.body}</p></div><div className="flex flex-col gap-3 sm:flex-row lg:flex-col"><a href={accessMailto(locale)} className="button-primary focus-ring inline-flex h-12 items-center justify-center rounded-full px-6 font-semibold">{copy.primary}</a><a href={contactMailto(locale)} className="button-secondary focus-ring inline-flex h-12 items-center justify-center rounded-full px-6 font-semibold">{copy.secondary}</a></div></div></section>;
}
