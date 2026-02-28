"use client";

import { useState } from "react";
import type { TvThemeKey } from "@/lib/wallpaper";

interface ShareButtonProps {
  tankUrl: string;
  theme?: TvThemeKey;
}

/** Theme-aware bar styles to blend with page background */
const SHARE_STYLES: Record<TvThemeKey, string> = {
  light:
    "bg-neutral-700/60 border-neutral-500/80 hover:border-neutral-600 text-neutral-100",
  dark:
    "bg-neutral-800/70 border-neutral-500/80 hover:border-neutral-400 text-white",
  blue:
    "bg-cyan-900/50 border-cyan-400/70 hover:border-cyan-300 text-white",
  purple:
    "bg-purple-900/50 border-purple-400/70 hover:border-purple-300 text-white",
};

export function ShareButton({ tankUrl, theme = "dark" }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const copyUrl = () => {
    navigator.clipboard.writeText(tankUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={copyUrl}
      className={`font-pixelify text-xs px-4 py-2 rounded-full border-2 shadow-lg transition-colors flex-shrink-0 ${SHARE_STYLES[theme]}`}
      aria-label={copied ? "Link copied" : "Copy tank link"}
      title={copied ? "Link copied" : "Copy tank link"}
    >
      {copied ? "Link copied" : "Invite friends"}
    </button>
  );
}
