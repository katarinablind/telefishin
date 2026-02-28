"use client";

import { useEffect, useRef } from "react";
import { getWallpaperUrl, type WallpaperKey } from "@/lib/wallpaper";

interface WallpaperPickerProps {
  current: WallpaperKey;
  onChange: (key: WallpaperKey) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const OPTIONS: { key: WallpaperKey; label: string }[] = [
  { key: "light", label: "Light" },
  { key: "dark", label: "Dark" },
  { key: "adaptive", label: "Adaptive" },
  { key: "disco", label: "Disco" },
  { key: "pixelated", label: "Pixelated" },
];

/** Thumbnail URL for Adaptive: sunset to suggest day/night transition. */
const ADAPTIVE_THUMB_URL = "/backgrounds/sunset.png";

export function WallpaperPicker({ current, onChange, open, onOpenChange }: WallpaperPickerProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (panelRef.current?.contains(target)) return;
      if ((e.target as HTMLElement).closest?.("[data-wallpaper-trigger]")) return;
      onOpenChange(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <>
      <div
        ref={panelRef}
        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 z-[90] p-4 min-w-[220px] rounded-[2rem] bg-neutral-900/95 border border-neutral-600 shadow-xl"
      >
        <div className="flex flex-col gap-2">
          {OPTIONS.map(({ key, label }) => {
            const isAdaptive = key === "adaptive";
            const thumbUrl = isAdaptive ? ADAPTIVE_THUMB_URL : getWallpaperUrl(key);
            return (
              <span key={key}>
                {key === "disco" && <div className="my-1 h-px bg-neutral-600" role="separator" />}
                <button
                  type="button"
                  onClick={() => {
                    onChange(key);
                    onOpenChange(false);
                  }}
                  className="flex items-center gap-3 w-full rounded-full py-1 pr-3 pl-1 hover:bg-white/5 transition-colors text-left"
                >
                  <span
                    className="flex-shrink-0 w-12 h-12 rounded-full border-2 overflow-hidden bg-cover bg-center flex items-center justify-center"
                    style={{
                      backgroundImage: `url(${thumbUrl})`,
                      borderColor: current === key ? "var(--highlight)" : "rgba(255,255,255,0.2)",
                    }}
                  >
                    {isAdaptive && (
                      <span className="text-xs font-semibold text-white drop-shadow-md">A</span>
                    )}
                  </span>
                  <span className="font-pixelify text-sm text-white">{label}</span>
                </button>
              </span>
            );
          })}
        </div>
      </div>
    </>
  );
}
