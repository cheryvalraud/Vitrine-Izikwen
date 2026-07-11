"use client";

import type { ComponentType } from "react";
import { useEffect, useState, useSyncExternalStore } from "react";

const DESKTOP_MOTION = "(min-width: 1024px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";
const subscribe = (change: () => void) => { const media = matchMedia(DESKTOP_MOTION); media.addEventListener("change", change); return () => media.removeEventListener("change", change); };
const snapshot = () => matchMedia(DESKTOP_MOTION).matches;

export default function SiteAnimations() {
  const desktop = useSyncExternalStore(subscribe, snapshot, () => false);
  const [DesktopMotion, setDesktopMotion] = useState<ComponentType | null>(null);

  useEffect(() => {
    if (desktop || matchMedia(DESKTOP_MOTION).matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const nodes = [...document.querySelectorAll<HTMLElement>(".section-reveal")].filter(node => node.getBoundingClientRect().top > innerHeight * .85);
    nodes.forEach(node => node.classList.add("mobile-reveal"));
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
    }), { rootMargin: "0px 0px -8%" });
    nodes.forEach(node => observer.observe(node));
    return () => {
      observer.disconnect();
      nodes.forEach(node => node.classList.remove("mobile-reveal", "is-visible"));
    };
  }, [desktop]);

  useEffect(() => {
    let current = true;
    if (desktop && !DesktopMotion) import("@/components/DesktopSiteAnimations").then(module => { if (current) setDesktopMotion(() => module.default); });
    return () => { current = false; };
  }, [desktop, DesktopMotion]);

  return desktop && DesktopMotion ? <DesktopMotion /> : null;
}
