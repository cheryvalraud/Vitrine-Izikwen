"use client";

import type { RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function DesktopShowcaseAnimations({ root, onActive }: { root: RefObject<HTMLElement | null>; onActive: (index: number) => void }) {
  useGSAP(() => {
    const steps = gsap.utils.toArray<HTMLElement>(".story-step");
    const images = gsap.utils.toArray<HTMLElement>(".phone-shot");
    gsap.set(images, { autoAlpha: 0, scale: .985 });
    gsap.set(images[0], { autoAlpha: 1, scale: 1 });
    ScrollTrigger.create({ trigger: ".showcase-grid", start: "top top+=96", end: "bottom bottom-=120", pin: ".phone-stage", pinSpacing: false });
    steps.forEach((step, index) => ScrollTrigger.create({ trigger: step, start: "top center", end: "bottom center", onToggle: ({ isActive }) => {
      if (!isActive) return;
      onActive(index);
      gsap.to(images, { autoAlpha: 0, scale: .985, duration: .25, ease: "power2.out" });
      gsap.to(images[index], { autoAlpha: 1, scale: 1, duration: .36, ease: "power2.out" });
    }}));
  }, { scope: root, dependencies: [onActive] });
  return null;
}
