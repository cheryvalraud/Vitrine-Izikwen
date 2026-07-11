"use client";

import type { ComponentType } from "react";
import { useEffect, useState, useSyncExternalStore } from "react";

const DESKTOP_QUERY = "(min-width: 1100px) and (pointer: fine) and (hover: hover) and (prefers-reduced-motion: no-preference)";

function capable() {
  const nav = navigator as Navigator & { deviceMemory?: number };
  return window.matchMedia(DESKTOP_QUERY).matches
    && (nav.hardwareConcurrency || 4) >= 4
    && (nav.deviceMemory === undefined || nav.deviceMemory >= 4);
}

function subscribe(change: () => void) {
  const media = window.matchMedia(DESKTOP_QUERY);
  media.addEventListener("change", change);
  return () => media.removeEventListener("change", change);
}

function SceneFallback({ label }: { label: string }) {
  return <div role="img" aria-label={label} data-scene-fallback className="absolute inset-0 flex items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_55%_42%,rgba(198,243,109,.18),transparent_34%),linear-gradient(135deg,#101312,#12241c)]"><div className="relative flex h-48 w-48 items-center justify-center rounded-full border border-[#d8b35f]/45 bg-[radial-gradient(circle_at_38%_32%,#f9fff6,#d7b76a_18%,#1fe8a0_38%,#08241c_72%,#03110f)] shadow-[0_0_90px_rgba(31,232,160,.22)]"><span className="text-4xl font-extrabold text-[#fef6db]">Iz</span><span className="absolute -inset-14 rounded-full border border-[#c6f36d]/15" /></div></div>;
}

export default function ThreeSceneLoader({ label }: { label: string }) {
  const canRender = useSyncExternalStore(subscribe, capable, () => false);
  const [Scene, setScene] = useState<ComponentType<{ label: string }> | null>(null);

  useEffect(() => {
    let active = true;
    if (canRender && !Scene) {
      import("@/components/ThreeScene").then((module) => {
        if (active) setScene(() => module.default);
      });
    }
    return () => { active = false; };
  }, [canRender, Scene]);

  return canRender && Scene ? <Scene label={label} /> : <SceneFallback label={label} />;
}
