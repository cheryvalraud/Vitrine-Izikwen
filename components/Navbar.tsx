import Image from "next/image";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import type { Dictionary, Locale } from "@/lib/i18n";
import { accessMailto } from "@/lib/site";

export default function Navbar({ locale, copy }: { locale: Locale; copy: Dictionary["nav"] }) {
  const items = [
    [copy.app, "#app"], [copy.how, "#how"], [copy.trust, "#trust"],
    [copy.assets, "#assets"], [copy.mission, "#mission"],
  ];

  return (
    <header className="site-nav sticky top-0 z-50 border-b border-white/10 bg-[#101312]/92 text-white backdrop-blur-xl">
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8" aria-label={copy.menu}>
        <a href="#home" className="focus-ring flex items-center gap-3 rounded-lg" aria-label={copy.homeLabel}>
          <Image src="/images/izikwen-logo-mark.png" alt="" width={46} height={26} preload className="h-auto w-11" />
          <span className="text-xl font-semibold">Izikwen</span>
        </a>
        <div className="hidden items-center gap-6 lg:flex">
          {items.map(([label, href]) => <a key={href} href={href} className="focus-ring rounded text-sm font-medium text-white/68 hover:text-white">{label}</a>)}
        </div>
        <div className="flex items-center gap-2">
          <LanguageSwitcher locale={locale} label={copy.languages} />
          <a href={accessMailto(locale)} className="button-primary focus-ring hidden h-10 items-center rounded-full px-4 text-sm font-semibold sm:inline-flex">{copy.requestAccess}</a>
        </div>
      </nav>
    </header>
  );
}
