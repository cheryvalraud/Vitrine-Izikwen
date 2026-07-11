"use client";

import { localeLabels, locales, type Locale } from "@/lib/i18n";

export default function LanguageSwitcher({ locale, label }: { locale: Locale; label: string }) {
  const follow = (nextLocale: Locale) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    localStorage.setItem("izikwen-locale", nextLocale);
    if (window.location.hash) {
      event.preventDefault();
      window.location.assign(`/${nextLocale}${window.location.hash}`);
    }
  };

  return (
    <details className="language-menu relative">
      <summary className="focus-ring cursor-pointer list-none rounded-full border border-white/15 px-3 py-2 text-sm font-semibold text-white/78 hover:text-white" aria-label={`${locale.toUpperCase()} — ${label}`}>
        {locale.toUpperCase()} <span aria-hidden="true">⌄</span>
      </summary>
      <div className="absolute right-0 top-[calc(100%+.6rem)] min-w-40 rounded-2xl border border-white/12 bg-[#171b19] p-2 shadow-2xl">
        {locales.map((item) => (
          <a
            key={item}
            href={`/${item}`}
            hrefLang={item}
            lang={item}
            aria-current={item === locale ? "page" : undefined}
            onClick={follow(item)}
            className="focus-ring block rounded-xl px-3 py-2 text-sm text-white/72 hover:bg-white/8 hover:text-white aria-[current=page]:bg-[#c6f36d] aria-[current=page]:text-[#101312]"
          >
            {localeLabels[item]}
          </a>
        ))}
      </div>
    </details>
  );
}
