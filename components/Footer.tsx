import Image from "next/image";
import type { Dictionary, Locale } from "@/lib/i18n";
import { accessMailto, contactEmail, contactMailto } from "@/lib/site";

export default function Footer({ locale, copy }: { locale: Locale; copy: Dictionary["footer"] }) {
  return <footer className="bg-[#101312] px-4 py-10 text-white sm:px-6"><div className="mx-auto max-w-7xl">
    <div className="grid gap-10 border-t border-white/12 pt-10 lg:grid-cols-[1fr_auto] lg:items-end"><div><div className="flex items-center gap-3"><Image src="/images/izikwen-logo-mark.png" alt="" width={42} height={24} className="h-auto w-11" /><span className="font-semibold">Izikwen</span></div><h2 className="mt-8 max-w-2xl text-3xl font-semibold sm:text-4xl">{copy.tagline}</h2><p className="mt-4 max-w-2xl text-sm leading-6 text-white/68">{copy.description}</p></div><div className="grid gap-3 sm:min-w-64"><a href={accessMailto(locale)} className="button-primary focus-ring rounded-full px-4 py-3 text-center text-sm font-semibold">{copy.requestAccess}</a><a href={contactMailto(locale)} className="button-secondary focus-ring rounded-full px-4 py-3 text-center text-sm font-semibold">{copy.contact}</a></div></div>
    <div className="mt-10 flex flex-col gap-3 text-xs text-white/58 sm:flex-row sm:items-center sm:justify-between"><p>{copy.copyright}</p><a className="focus-ring rounded hover:text-white" href={`mailto:${contactEmail}`} aria-label={`${contactEmail} — ${copy.emailLabel}`}>{contactEmail}</a></div>
  </div></footer>;
}
