"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { FISH_IMAGES } from "@/lib/fishAssets";

const SUN_IMAGE = "/assets/2e83eebfb0194169db403e3654fd3fc63b713e09.png";
const MOON_IMAGE = "/assets/fec3ab7383de166cf6914526dd3da03d6e1a4850.png";

/** Five demo fish: some start in the middle/right so the tank feels lived-in */
const DEMO_FISH = [
  { src: FISH_IMAGES[0], y: "15%", duration: 22, startX: 180, name: "Katarina", city: "Helsinki", isDay: true },
  { src: FISH_IMAGES[1], y: "32%", duration: 24, startX: 320, name: "Anna", city: "New York City", isDay: false },
  { src: FISH_IMAGES[2], y: "49%", duration: 20, startX: 60, name: "Keila", city: "Mexico City", isDay: true },
  { src: FISH_IMAGES[3], y: "66%", duration: 26, startX: 400, name: "Sauhee", city: "Seoul", isDay: false },
  { src: FISH_IMAGES[4], y: "83%", duration: 23, startX: 260, name: "Peggy", city: "Tokyo", isDay: true },
];

const FISH_SIZE = 56;
const GLOW_SIZE = FISH_SIZE * 2;

export function DemoTank() {
  return (
    <div className="w-full max-w-md mx-auto mb-10">
      <div
        className="relative w-full overflow-hidden rounded-[140px] border-2 border-neutral-700 bg-cover bg-center"
        style={{
          aspectRatio: "624 / 455",
          backgroundImage: "url(/backgrounds/light.png)",
        }}
      >
        {DEMO_FISH.map((fish, i) => (
          <motion.div
            key={i}
            className="absolute flex items-center justify-center"
            style={{
              width: FISH_SIZE,
              height: FISH_SIZE,
              top: fish.y,
              left: "-7rem",
            }}
            initial={{ x: fish.startX }}
            animate={{
              x: [fish.startX, fish.startX + 480],
              y: [0, -12, 0],
            }}
            transition={{
              x: {
                duration: fish.duration,
                repeat: Infinity,
                repeatType: "loop",
                ease: "linear",
              },
              y: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                repeatType: "loop",
                delay: i * 0.6,
              },
            }}
          >
            {/* Glow (day = yellow, night = purple) */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
              style={{
                width: GLOW_SIZE,
                height: GLOW_SIZE,
                background: fish.isDay
                  ? "radial-gradient(circle at center, rgba(255, 200, 50, 0.8) 0%, rgba(255, 180, 70, 0.6) 25%, rgba(255, 165, 0, 0.5) 40%, rgba(255, 140, 0, 0.3) 60%, transparent 80%)"
                  : "radial-gradient(circle at center, rgba(75, 0, 130, 1) 0%, rgba(60, 20, 140, 0.84) 25%, rgba(50, 50, 150, 0.7) 40%, rgba(40, 60, 140, 0.42) 60%, transparent 80%)",
                filter: "blur(6px)",
                zIndex: -1,
              }}
            />
            {/* Sun or moon */}
            <div
              className="absolute left-1/2 pointer-events-none"
              style={{
                top: "-22px",
                transform: "translateX(calc(-50% + 18px))",
              }}
            >
              <img
                src={fish.isDay ? SUN_IMAGE : MOON_IMAGE}
                alt={fish.isDay ? "day" : "night"}
                className="w-6 h-6 object-contain"
                style={{ filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.3))" }}
              />
            </div>
            {/* Fish sprite */}
            <img
              src={fish.src}
              alt=""
              className="w-full h-full object-contain relative z-0"
            />
            {/* Name — City */}
            <div
              className="absolute top-1/2 -translate-y-1/2 whitespace-nowrap text-white pointer-events-none font-pixelify text-xs"
              style={{
                right: "100%",
                transform: "translateY(-50%) translateX(-6px)",
                textShadow: "0 1px 2px rgba(0,0,0,0.6)",
              }}
            >
              {fish.name} — {fish.city}
            </div>
          </motion.div>
        ))}
      </div>
      <div className="mt-8 flex flex-col gap-3">
        <Link
          href="/create"
          className="block w-full text-center px-6 py-3 rounded-xl border-2 border-highlight bg-transparent text-highlight font-pixelify text-base hover:bg-highlight hover:text-white transition"
        >
          Create your fish tank
        </Link>
        <a
          href="https://www.youtube.com/watch?v=NvdBOO19H1Y"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center px-6 py-3 rounded-xl border-2 border-neutral-500 bg-transparent text-neutral-600 font-pixelify text-base hover:bg-neutral-100 hover:text-black hover:border-neutral-400 transition"
        >
          Watch concept video
        </a>
      </div>
    </div>
  );
}
