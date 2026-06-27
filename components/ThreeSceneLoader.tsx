"use client";

import dynamic from "next/dynamic";

const ThreeScene = dynamic(() => import("@/components/ThreeScene"), {
  ssr: false,
  loading: () => (
    <div
      aria-label="Loading IZIKWEN crypto coin scene"
      className="absolute inset-0 h-full w-full bg-[radial-gradient(circle_at_50%_45%,rgba(31,232,160,0.18),transparent_38%),linear-gradient(135deg,#030806,#07111f)]"
    />
  ),
});

export default function ThreeSceneLoader() {
  return <ThreeScene />;
}
