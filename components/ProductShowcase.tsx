"use client";

import Image from "next/image";
import type { ComponentType, ReactNode, RefObject } from "react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { Dictionary } from "@/lib/i18n";

const DESKTOP_STORY = "(min-width: 1024px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";
type AnimatorProps = { root: RefObject<HTMLElement | null>; onActive: (index: number) => void };
const subscribe = (change: () => void) => { const media = matchMedia(DESKTOP_STORY); media.addEventListener("change", change); return () => media.removeEventListener("change", change); };
const snapshot = () => matchMedia(DESKTOP_STORY).matches;

export default function ProductShowcase({ copy }: { copy: Dictionary["showcase"] }) {
  const root = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState(0);
  const desktop = useSyncExternalStore(subscribe, snapshot, () => false);
  const [Animator, setAnimator] = useState<ComponentType<AnimatorProps> | null>(null);

  useEffect(() => {
    let current = true;
    if (desktop && !Animator) import("@/components/DesktopShowcaseAnimations").then(module => { if (current) setAnimator(() => module.default); });
    return () => { current = false; };
  }, [desktop, Animator]);

  return <section ref={root} id="app" className="section-pad bg-[#f8f7f2]">{desktop && Animator ? <Animator root={root} onActive={setActive} /> : null}<div className="mx-auto max-w-7xl">
    <div className="showcase-heading max-w-3xl"><p className="eyebrow text-[#277a43]">{copy.kicker}</p><h2 className="section-title">{copy.title}</h2></div>
    <div className="showcase-grid mt-14 grid gap-10 lg:grid-cols-[.8fr_1fr] lg:gap-16">
      <div className="phone-stage hidden lg:block"><PhoneFrame>{copy.screens.map((screen) => <Image key={screen.id} src={screen.image} alt={screen.alt} width={780} height={1688} unoptimized sizes="360px" quality={90} className="phone-shot absolute inset-0 h-full w-full rounded-[30px] object-cover" />)}</PhoneFrame><div className="mx-auto mt-7 flex w-[360px] gap-2" role="progressbar" aria-label={copy.progressLabel} aria-valuemin={1} aria-valuemax={copy.screens.length} aria-valuenow={active + 1}>{copy.screens.map((screen, index) => <span key={screen.id} className={`h-1 flex-1 rounded-full transition-colors ${index <= active ? "bg-[#277a43]" : "bg-black/12"}`} />)}</div></div>
      <div className="grid gap-8 lg:gap-12">{copy.screens.map((screen, index) => <article key={screen.id} className={`story-step border-t pt-8 transition-colors ${active === index ? "border-[#277a43]" : "border-black/12"}`}><p className="text-sm font-semibold text-[#277a43]">{String(index + 1).padStart(2, "0")}</p><h3 className="mt-3 text-2xl font-semibold sm:text-3xl">{screen.title}</h3><p className="body-copy mt-3 max-w-xl">{screen.copy}</p><div className="mt-6 lg:hidden"><PhoneFrame compact><Image src={screen.image} alt={screen.alt} width={780} height={1688} unoptimized sizes="280px" quality={90} className="h-full w-full rounded-[24px] object-cover" /></PhoneFrame></div></article>)}</div>
    </div>
  </div></section>;
}

function PhoneFrame({ children, compact = false }: { children: ReactNode; compact?: boolean }) {
  return <div className={`relative mx-auto overflow-hidden rounded-[42px] bg-[#101312] p-2 shadow-[0_28px_90px_rgba(16,19,18,.24)] ${compact ? "max-w-[280px]" : "w-[360px]"}`}><div className="relative aspect-[780/1688] overflow-hidden rounded-[32px] bg-white">{children}</div></div>;
}
