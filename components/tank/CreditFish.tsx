"use client";

import { useState, useRef, useEffect } from "react";
import { FISH_IMAGES } from "@/lib/fishAssets";
import type { TvThemeKey } from "@/lib/wallpaper";

const CREDITS_NAMES = "Made with love in Seattle by Keila Braden, Katarina Blind, Sauhee Han, Anna Karen Rodriguez and Peggy Shen.";
const CREDITS_TOOLS = "Built with Figma Make, Cursor and Fusion 360. 2D assets created with OpenAI.";

/** Theme-aware button border/bg so credit blends with page background */
const BAR_BUTTON_STYLES: Record<TvThemeKey, string> = {
  light: "border-neutral-500/80 hover:border-neutral-600 bg-neutral-700/60",
  dark: "border-neutral-500/80 hover:border-neutral-400 bg-neutral-800/70",
  blue: "border-cyan-400/70 hover:border-cyan-300 bg-cyan-900/50",
  purple: "border-purple-400/70 hover:border-purple-300 bg-purple-900/50",
};

const TOOLTIP_STYLES: Record<TvThemeKey, string> = {
  light: "bg-neutral-800/95 border-neutral-500 text-neutral-100",
  dark: "bg-neutral-900/95 border-neutral-600 text-white",
  blue: "bg-cyan-900/95 border-cyan-600 text-white",
  purple: "bg-purple-900/95 border-purple-600 text-white",
};

export function CreditFish({ theme = "dark" }: { theme?: TvThemeKey }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const fish3Src = FISH_IMAGES[2]; // fish 3

  useEffect(() => {
    if (!showTooltip) return;
    const close = (e: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(e.target as Node)) {
        setShowTooltip(false);
      }
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [showTooltip]);

  return (
    <div ref={tooltipRef} className="relative inline-flex items-center">
      <button
        type="button"
        onClick={() => setShowTooltip((v) => !v)}
        className={`w-8 h-8 rounded-full overflow-hidden bg-cover bg-center flex-shrink-0 border-2 transition-colors ${BAR_BUTTON_STYLES[theme]}`}
        style={{ backgroundImage: `url(${fish3Src})` }}
        aria-label="Credits"
        title="Credits"
      />
      {showTooltip && (
        <div
          className={`absolute left-full bottom-0 ml-3 min-w-[200px] max-w-[260px] px-3 py-2 rounded-lg border shadow-lg font-pixelify text-xs ${TOOLTIP_STYLES[theme]}`}
          role="tooltip"
        >
          <p>{CREDITS_NAMES}</p>
          <p className="mt-3">{CREDITS_TOOLS}</p>
        </div>
      )}
    </div>
  );
}
