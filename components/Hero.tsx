import Image from "next/image";
import ThreeSceneLoader from "@/components/ThreeSceneLoader";
import type { Dictionary, Locale } from "@/lib/i18n";
import { accessMailto } from "@/lib/site";

export default function Hero({ locale, copy }: { locale: Locale; copy: Dictionary["hero"] }) {
  return (
    <section id="home" className="relative isolate min-h-[calc(92svh-4rem)] overflow-hidden bg-[#101312] text-white">
      <div className="absolute inset-0 hidden lg:block"><ThreeSceneLoader label={copy.sceneAlt} /></div>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#101312_0%,rgba(16,19,18,.94)_43%,rgba(16,19,18,.3)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-[#f8f7f2]" />
      <div className="relative mx-auto grid min-h-[calc(92svh-4rem)] max-w-7xl items-center gap-8 px-4 pb-14 pt-12 sm:px-6 lg:grid-cols-[.92fr_.72fr] lg:px-8">
        <div className="hero-copy max-w-3xl">
          <p className="eyebrow text-[#c6f36d]">{copy.kicker}</p>
          <h1 className="mt-5 text-5xl font-semibold leading-[.98] tracking-[-.04em] sm:text-7xl lg:text-8xl">{copy.title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/74 sm:text-xl">{copy.body}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href={accessMailto(locale)} className="button-primary focus-ring inline-flex h-12 items-center justify-center rounded-full px-6 font-semibold">{copy.primary}</a>
            <a href="#app" className="button-secondary focus-ring inline-flex h-12 items-center justify-center rounded-full px-6 font-semibold">{copy.secondary}</a>
          </div>
        </div>
        <div className="hero-phone relative mx-auto w-full max-w-[250px] sm:max-w-[310px] lg:hidden">
          <div className="absolute -inset-6 rounded-[44px] bg-[#c6f36d]/16 blur-2xl" />
          <div className="relative overflow-hidden rounded-[34px] border border-white/16 bg-[#111] p-2 shadow-2xl">
            <Image src="/app-screens/dashboard.webp" alt={copy.dashboardAlt} width={780} height={1688} preload unoptimized sizes="(max-width: 640px) 250px, 310px" quality={90} className="h-auto w-full rounded-[26px]" />
          </div>
        </div>
      </div>
    </section>
  );
}
