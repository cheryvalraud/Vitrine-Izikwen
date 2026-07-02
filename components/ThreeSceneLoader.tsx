"use client";

import dynamic from "next/dynamic";
import { useSyncExternalStore } from "react";

const ThreeScene = dynamic(() => import("@/components/ThreeScene"), {
  ssr: false,
  loading: () => <SceneFallback />,
});

const fallbackAssets = [
  { ticker: "BTC", accent: "#f4d187" },
  { ticker: "ETH", accent: "#b4a7ff" },
  { ticker: "USDT", accent: "#27d6c3" },
];

function SceneFallback() {
  return (
    <div
      aria-label="IZIKWEN private vault for Bitcoin, Ethereum, and USDT"
      className="absolute inset-0 flex h-full w-full items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_50%_42%,rgba(31,232,160,0.2),transparent_42%),linear-gradient(135deg,#030806,#07111f)]"
    >
      <div className="relative flex h-40 w-40 items-center justify-center rounded-full border border-[#f4d187]/40 bg-[radial-gradient(circle_at_38%_32%,#f9fff6,#d7b76a_18%,#1fe8a0_38%,#08241c_72%,#03110f)] shadow-[0_0_70px_rgba(31,232,160,0.28)] sm:h-52 sm:w-52">
        <span className="text-3xl font-extrabold tracking-tight text-[#fef6db] drop-shadow-[0_0_18px_rgba(15,255,166,0.5)] sm:text-4xl">
          IZ
        </span>
        <span className="absolute inset-0 rounded-full border border-white/20" />
      </div>

      <div className="absolute inset-x-0 bottom-8 flex justify-center gap-3 px-4">
        {fallbackAssets.map((asset) => (
          <span
            key={asset.ticker}
            className="rounded-full border border-white/14 bg-white/[0.07] px-3 py-1.5 text-xs font-semibold text-white backdrop-blur"
            style={{ boxShadow: `0 0 0 1px ${asset.accent}22 inset` }}
          >
            {asset.ticker}
          </span>
        ))}
      </div>
    </div>
  );
}

// Desktop/laptop only: a mouse-driven pointer plus a hover-capable input is a
// reliable signal that we are not on a phone or touch tablet.
const DESKTOP_QUERY =
  "(min-width: 1024px) and (pointer: fine) and (hover: hover) and (prefers-reduced-motion: no-preference)";

function subscribe(onStoreChange: () => void) {
  const mediaQueryList = window.matchMedia(DESKTOP_QUERY);
  mediaQueryList.addEventListener("change", onStoreChange);
  return () => mediaQueryList.removeEventListener("change", onStoreChange);
}

function getSnapshot() {
  return window.matchMedia(DESKTOP_QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

export default function ThreeSceneLoader() {
  const canRender3D = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  if (!canRender3D) {
    return <SceneFallback />;
  }

  return <ThreeScene />;
}
