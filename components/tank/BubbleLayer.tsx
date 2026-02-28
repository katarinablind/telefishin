"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { createClient } from "@/lib/supabase/client";
import { SCREEN_CUTOUT_HEIGHT } from "@/lib/tvLayout";

export interface BubbleRecord {
  id: string;
  tank_id: string;
  created_at: string;
  member_id?: string | null;
  device_id?: string | null;
}

const BUBBLE_DURATION_MS = 3000;
const BUBBLE_SIZE_MIN = 10;
const BUBBLE_SIZE_MAX = 20;
const BUBBLES_PER_TRAIL = 24;
const STAGGER_SECONDS = 0.1;
/** Bubbles start this far below the visible area so you don't see the origin */
const BUBBLE_ORIGIN_BELOW = 100;

function randomInRange(min: number, max: number) {
  return min + Math.random() * (max - min);
}

interface BubbleTrail {
  trailKey: string;
  xPct: number;
  displayName: string;
  bubbleCount: number;
}

interface BubbleLayerProps {
  tankId: string;
  triggerBubbleAt?: number;
  members?: { id: string; display_name: string | null }[];
  currentDisplayName?: string | null;
}

export function BubbleLayer({
  tankId,
  triggerBubbleAt = 0,
  members = [],
  currentDisplayName = null,
}: BubbleLayerProps) {
  const [trails, setTrails] = useState<BubbleTrail[]>([]);
  const prevTriggerRef = useRef(0);
  const trailRemovalTimeouts = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  const removeTrail = (trailKey: string) => {
    const t = trailRemovalTimeouts.current[trailKey];
    if (t) clearTimeout(t);
    delete trailRemovalTimeouts.current[trailKey];
    setTrails((prev) => prev.filter((tr) => tr.trailKey !== trailKey));
  };

  const addTrail = (trailKey: string, xPct: number, displayName: string) => {
    const trail: BubbleTrail = {
      trailKey,
      xPct,
      displayName: displayName.trim() || "Someone",
      bubbleCount: BUBBLES_PER_TRAIL,
    };
    setTrails((prev) => [...prev, trail]);
    const durationSec = BUBBLE_DURATION_MS / 1000;
    const totalSec = durationSec + (trail.bubbleCount - 1) * STAGGER_SECONDS;
    const timeout = setTimeout(() => removeTrail(trailKey), totalSec * 1000);
    trailRemovalTimeouts.current[trailKey] = timeout;
  };

  useEffect(() => {
    if (triggerBubbleAt > 0 && triggerBubbleAt !== prevTriggerRef.current) {
      prevTriggerRef.current = triggerBubbleAt;
      const name = currentDisplayName?.trim() || "Someone";
      addTrail(`opt-${triggerBubbleAt}`, randomInRange(15, 85), name);
    }
  }, [tankId, triggerBubbleAt, currentDisplayName]);

  useEffect(() => {
    const supabase = createClient();
    const channel = supabase
      .channel(`bubbles:${tankId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "bubbles",
          filter: `tank_id=eq.${tankId}`,
        },
        (payload: { new: BubbleRecord }) => {
          const row = payload.new;
          const member = members.find((m) => m.id === row.member_id);
          const displayName = member?.display_name?.trim() || "Someone";
          addTrail(row.id, randomInRange(15, 85), displayName);
        }
      )
      .subscribe();

    return () => {
      Object.values(trailRemovalTimeouts.current).forEach(clearTimeout);
      trailRemovalTimeouts.current = {};
      supabase.removeChannel(channel);
    };
  }, [tankId, members]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ borderRadius: "200px" }}>
      <AnimatePresence>
        {trails.map((trail) => (
          <div
            key={trail.trailKey}
            className="absolute bottom-0 flex flex-col items-center"
            style={{
              left: `${trail.xPct}%`,
              transform: "translateX(-50%)",
            }}
          >
            {/* Single name label next to the trail, rises slower and stays visible */}
            <motion.span
              className="absolute left-full font-pixelify text-[10px] text-white whitespace-nowrap pointer-events-none ml-2 opacity-100"
              style={{ bottom: 0, textShadow: "0 1px 3px rgba(0,0,0,0.8), 0 0 2px rgba(0,0,0,0.8)" }}
              initial={{ opacity: 1, y: BUBBLE_ORIGIN_BELOW }}
              animate={{
                opacity: 1,
                y: BUBBLE_ORIGIN_BELOW - SCREEN_CUTOUT_HEIGHT * 0.5,
              }}
              transition={{
                duration: (BUBBLE_DURATION_MS * 1.8) / 1000,
                ease: "easeOut",
              }}
            >
              {trail.displayName}
            </motion.span>
            {/* Vertical trail of bubbles */}
            {Array.from({ length: trail.bubbleCount }, (_, i) => {
              const size = BUBBLE_SIZE_MIN + ((i * 7) % (BUBBLE_SIZE_MAX - BUBBLE_SIZE_MIN + 1));
              const delay = i * STAGGER_SECONDS;
              return (
                <motion.div
                  key={`${trail.trailKey}-${i}`}
                  className="absolute rounded-full bg-white/40 border border-white/60"
                  style={{
                    width: size,
                    height: size,
                    left: "50%",
                    marginLeft: -size / 2,
                    bottom: 0,
                  }}
                  initial={{ opacity: 0, y: BUBBLE_ORIGIN_BELOW, scale: 0.5 }}
                  animate={{
                    opacity: [0, 0.8, 0],
                    y: -SCREEN_CUTOUT_HEIGHT - size,
                    scale: 1,
                  }}
                  transition={{
                    duration: BUBBLE_DURATION_MS / 1000,
                    delay,
                    ease: "easeOut",
                  }}
                />
              );
            })}
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}
