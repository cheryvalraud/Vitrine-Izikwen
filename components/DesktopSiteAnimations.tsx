"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function DesktopSiteAnimations() {
  useGSAP(() => {
    gsap.from(".hero-copy > *", { y: 26, duration: .7, ease: "power3.out", stagger: .06, clearProps: "transform" });
    gsap.utils.toArray<HTMLElement>(".section-reveal").forEach(item => gsap.from(item, { y: 30, duration: .65, ease: "power3.out", clearProps: "transform", scrollTrigger: { trigger: item, start: "top 82%", once: true } }));
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh, { once: true });
    document.fonts?.ready.then(refresh);
    return () => window.removeEventListener("load", refresh);
  });
  return null;
}
