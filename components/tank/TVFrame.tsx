"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { SCREEN_RECT } from "@/lib/tvLayout";
import { getTvTheme, TV_FRAME_PATHS } from "@/lib/wallpaper";
import { WallpaperPicker } from "./WallpaperPicker";
import { TankButtons } from "./TankButtons";
import type { WallpaperKey } from "@/lib/wallpaper";

const POWER_OFF_DURATION_MS = 200;

interface TVFrameProps {
  wallpaper: WallpaperKey;
  onWallpaperChange: (key: WallpaperKey) => void;
  onBubbleClick: () => void;
  children: React.ReactNode;
}

export function TVFrame({ wallpaper, onWallpaperChange, onBubbleClick, children }: TVFrameProps) {
  const [wallpaperPickerOpen, setWallpaperPickerOpen] = useState(false);
  const [powerOn, setPowerOn] = useState(true);
  const tvTheme = getTvTheme(wallpaper);
  const frameSrc = TV_FRAME_PATHS[tvTheme];

  const handlePowerClick = () => {
    setPowerOn((on) => !on);
  };

  return (
    <div
      className="relative w-full max-w-[767px] mx-auto"
      style={{ background: "none" }}
    >
      {/* Tank content clipped to screen area; old-TV zoom-to-center when power off. No background. */}
      <div
        className="absolute overflow-hidden"
        style={{
          top: SCREEN_RECT.top,
          left: SCREEN_RECT.left,
          right: SCREEN_RECT.right,
          bottom: SCREEN_RECT.bottom,
          borderRadius: "200px",
        }}
      >
        <motion.div
          className="absolute inset-0 origin-center"
          style={{ transformOrigin: "center center" }}
          animate={{ scale: powerOn ? 1 : 0 }}
          transition={{
            duration: POWER_OFF_DURATION_MS / 1000,
            ease: [0.4, 0, 0.2, 1],
          }}
        >
          {children}
        </motion.div>
      </div>

      {/* TV frame overlay (PNG with transparent background – no blend mode) */}
      <img
        src={frameSrc}
        alt=""
        className="block w-full h-auto pointer-events-none select-none"
      />

      {/* Button row: 48×48, 40px gap, 61pt + 4px from bottom (moved up 24px) */}
      <div
        className="absolute left-1/2 -translate-x-1/2 flex items-center"
        style={{ bottom: "calc(61pt + 4px)" }}
      >
        <TankButtons
          onPowerClick={handlePowerClick}
          onBackgroundClick={() => setWallpaperPickerOpen(true)}
          onBubbleClick={onBubbleClick}
        />
      </div>

      {/* Wallpaper popover: invisible anchor at center button, popup appears above */}
      <div
        className="absolute left-1/2 -translate-x-1/2 w-0 h-0"
        style={{ bottom: "calc(61pt + 4px)" }}
        aria-hidden
      >
        <WallpaperPicker
          current={wallpaper}
          onChange={onWallpaperChange}
          open={wallpaperPickerOpen}
          onOpenChange={setWallpaperPickerOpen}
        />
      </div>
    </div>
  );
}
