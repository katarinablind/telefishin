"use client";

import { useMemo } from "react";
import { motion } from "motion/react";
import { isDayInTimezone } from "@/lib/dayNight";
import { SCREEN_CUTOUT_WIDTH, SCREEN_CUTOUT_HEIGHT } from "@/lib/tvLayout";
import { FISH_IMAGES } from "@/lib/fishAssets";
import type { Member } from "./TankPage";

const FISH_SIZE = 120;
const SCREEN_WIDTH = SCREEN_CUTOUT_WIDTH;
const SCREEN_HEIGHT = SCREEN_CUTOUT_HEIGHT;
const SUN_IMAGE = "/assets/2e83eebfb0194169db403e3654fd3fc63b713e09.png";
const MOON_IMAGE = "/assets/fec3ab7383de166cf6914526dd3da03d6e1a4850.png";

interface FishProps {
  member: Member;
  index: number;
  totalMembers: number;
}

const STAGGER_DELAY_PER_INDEX = 0.2;

export function Fish({ member, index, totalMembers }: FishProps) {
  const isDaytime = useMemo(
    () => isDayInTimezone(member.timezone),
    [member.timezone]
  );

  // Stagger Y positions so fish have more space and don't overlap
  const initialY = useMemo(() => {
    if (totalMembers <= 0) return SCREEN_HEIGHT / 2 - FISH_SIZE / 2;
    const padding = 80;
    const usable = SCREEN_HEIGHT - FISH_SIZE - padding * 2;
    const step = totalMembers <= 1 ? 0 : usable / Math.max(1, totalMembers);
    return padding + step * index;
  }, [index, totalMembers]);

  // Duration 18–26s, stable per member (vary so fish don't stay in sync)
  const duration = useMemo(
    () => 18 + ((member.id.charCodeAt(0) + member.id.length) % 9),
    [member.id]
  );

  // Stagger start delay by index so fish don't all cross at once
  const initialDelay = useMemo(() => index * 5, [index]);

  // Vary bob phase so fish don't all go up/down in sync
  const bobDuration = 4;
  const bobPhase = useMemo(
    () => (member.id.charCodeAt(0) + index * 1.3) % bobDuration,
    [member.id, index]
  );

  // Swim left to right only
  const startX = -FISH_SIZE - 50;
  const endX = SCREEN_WIDTH + 50;

  const fishSrc = FISH_IMAGES[member.fish_type - 1] ?? FISH_IMAGES[0];
  const name = member.display_name ?? `Friend`;
  const city = member.city ?? "?";

  return (
    <motion.div
      key={member.id}
      className="absolute pointer-events-none"
      style={{
        width: FISH_SIZE,
        height: FISH_SIZE,
        top: initialY,
      }}
      initial={{
        opacity: 0,
        x: startX,
        y: 0,
      }}
      animate={{
        opacity: 1,
        x: [startX, endX],
        y: [0, -20, 0],
      }}
      transition={{
        opacity: { duration: 0.4, delay: index * STAGGER_DELAY_PER_INDEX },
        x: {
          duration,
          ease: "linear",
          delay: initialDelay,
          repeat: Infinity,
          repeatType: "loop",
        },
        y: {
          duration: bobDuration,
          repeat: Infinity,
          ease: "easeInOut",
          repeatType: "loop",
          delay: initialDelay + bobPhase,
        },
      }}
    >
      {/* Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{
          width: FISH_SIZE * 2,
          height: FISH_SIZE * 2,
          background: isDaytime
            ? "radial-gradient(circle at center, rgba(255, 200, 50, 0.8) 0%, rgba(255, 180, 70, 0.6) 25%, rgba(255, 165, 0, 0.5) 40%, rgba(255, 140, 0, 0.3) 60%, rgba(255, 120, 0, 0.1) 80%, transparent 100%)"
            : "radial-gradient(circle at center, rgba(75, 0, 130, 1) 0%, rgba(60, 20, 140, 0.84) 25%, rgba(50, 50, 150, 0.7) 40%, rgba(40, 60, 140, 0.42) 60%, rgba(30, 30, 100, 0.14) 80%, transparent 100%)",
          filter: "blur(8px)",
          zIndex: -1,
        }}
      />
      {/* Sun/moon in front; text trailing behind (left to right only) */}
      <div
        className="absolute left-1/2 pointer-events-none"
        style={{
          top: "-35px",
          transform: "translateX(calc(-50% + 30px))",
        }}
      >
        <img
          src={isDaytime ? SUN_IMAGE : MOON_IMAGE}
          alt={isDaytime ? "day" : "night"}
          className="w-8 h-8 object-contain"
          style={{ filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.3))" }}
        />
      </div>
      {/* Fish sprite */}
      <div className="absolute inset-0 flex items-center justify-center">
        <img
          src={fishSrc}
          alt=""
          className="w-[120px] h-[120px] object-contain"
        />
      </div>
      {/* Name — City label trailing behind (left of fish) */}
      <div
        className="absolute top-1/2 -translate-y-1/2 whitespace-nowrap text-white pointer-events-none font-pixelify"
        style={{
          fontSize: "16px",
          right: "100%",
          transform: "translateY(-50%) translateX(-10px)",
        }}
      >
        {name} — {city}
      </div>
    </motion.div>
  );
}
