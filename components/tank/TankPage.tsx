"use client";

import { useEffect, useState, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { getOrCreateDeviceId } from "@/lib/deviceId";
import {
  WALLPAPER_STORAGE_KEY,
  WALLPAPER_OPTIONS,
  getTvTheme,
  PAGE_BG_BY_THEME,
  type WallpaperKey,
} from "@/lib/wallpaper";
import { TVFrame } from "./TVFrame";
import { TankScreen } from "./TankScreen";
import { JoinSheet } from "./JoinSheet";
import { Fish } from "./Fish";
import { CreditFish } from "./CreditFish";
import { ShareButton } from "./ShareButton";
import { ShareModal } from "./ShareModal";
import { BubbleLayer } from "./BubbleLayer";

const BUBBLE_COOLDOWN_MS = 2000;

export interface Member {
  id: string;
  tank_id: string;
  device_id: string;
  display_name: string | null;
  city: string | null;
  timezone: string;
  fish_type: number;
}

export function TankPage({
  tankId,
  showShareOnMount = false,
}: {
  tankId: string;
  showShareOnMount?: boolean;
}) {
  const [wallpaper, setWallpaperState] = useState<WallpaperKey>("light");
  const [members, setMembers] = useState<Member[]>([]);
  const [currentMember, setCurrentMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [tankUrl, setTankUrl] = useState("");
  const [tankName, setTankName] = useState<string | null>(null);
  const [editingName, setEditingName] = useState(false);
  const [editNameValue, setEditNameValue] = useState("");
  const [bubbleTriggerAt, setBubbleTriggerAt] = useState<number>(0);
  const lastBubbleAt = useRef<number>(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setTankUrl(`${window.location.origin}/t/${tankId}`);
    }
  }, [tankId]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem(WALLPAPER_STORAGE_KEY);
    if (stored && WALLPAPER_OPTIONS.includes(stored as WallpaperKey)) {
      setWallpaperState(stored as WallpaperKey);
    }
  }, []);

  const setWallpaper = (key: WallpaperKey) => {
    setWallpaperState(key);
    if (typeof window !== "undefined") {
      localStorage.setItem(WALLPAPER_STORAGE_KEY, key);
    }
  };

  useEffect(() => {
    const supabase = createClient();
    const deviceId = getOrCreateDeviceId();

    (async () => {
      const { data: tank, error: tankError } = await supabase
        .from("tanks")
        .select("id, name")
        .eq("id", tankId)
        .single();

      if (tankError || !tank) {
        setError("Tank not found");
        setLoading(false);
        return;
      }

      setTankName(tank.name ?? null);

      const { data: membersList } = await supabase
        .from("members")
        .select("*")
        .eq("tank_id", tankId)
        .order("created_at", { ascending: true });

      setMembers(membersList ?? []);

      const me = (membersList ?? []).find((m) => m.device_id === deviceId);
      setCurrentMember(me ?? null);
      setLoading(false);
    })();
  }, [tankId]);

  const tvTheme = getTvTheme(wallpaper);
  const pageBg = PAGE_BG_BY_THEME[tvTheme];

  if (loading) {
    return (
      <main
        className="min-h-screen flex items-center justify-center p-6"
        style={{ backgroundColor: pageBg }}
      >
        <p className="font-pixelify text-xl text-white">Loading tank...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main
        className="min-h-screen flex flex-col items-center justify-center p-6"
        style={{ backgroundColor: pageBg }}
      >
        <p className="text-red-400 mb-4">{error}</p>
        <a href="/" className="text-primary underline">Back to home</a>
      </main>
    );
  }

  const handleBubbleClick = async () => {
    const now = Date.now();
    if (now - lastBubbleAt.current < BUBBLE_COOLDOWN_MS) return;
    lastBubbleAt.current = now;
    setBubbleTriggerAt(now);
    const supabase = createClient();
    const deviceId = getOrCreateDeviceId();
    await supabase.from("bubbles").insert({
      tank_id: tankId,
      device_id: deviceId,
      member_id: currentMember?.id ?? null,
    });
  };

  const handleSaveTankName = async () => {
    const value = editNameValue.trim() || null;
    setEditingName(false);
    const supabase = createClient();
    await supabase.from("tanks").update({ name: value }).eq("id", tankId);
    setTankName(value);
  };

  const handleJoinSubmit = async (data: {
    fish_type: number;
    display_name: string | null;
    city: string | null;
    timezone: string;
  }) => {
    const supabase = createClient();
    const deviceId = getOrCreateDeviceId();

    const { data: row, error } = await supabase
      .from("members")
      .upsert(
        {
          tank_id: tankId,
          device_id: deviceId,
          fish_type: data.fish_type,
          display_name: data.display_name,
          city: data.city,
          timezone: data.timezone,
        },
        { onConflict: "tank_id,device_id" }
      )
      .select()
      .single();

    if (error) throw new Error(error.message);
    if (row) {
      setCurrentMember(row as Member);
      setMembers((prev) => {
        const exists = prev.some((m) => m.id === row.id);
        if (exists) return prev.map((m) => (m.id === row.id ? (row as Member) : m));
        return [...prev, row as Member];
      });
      if (showShareOnMount) setShowShareModal(true);
    }
  };

  return (
    <main
      className="min-h-screen flex items-center justify-center p-6"
      style={{ backgroundColor: pageBg }}
    >
      <JoinSheet
        open={currentMember === null}
        onSubmit={handleJoinSubmit}
      />
      {showShareModal && tankUrl && (
        <ShareModal
          tankUrl={tankUrl}
          onClose={() => setShowShareModal(false)}
        />
      )}
      <div className="relative w-full max-w-[767px] mx-auto">
        {/* Tank name on top of the tank: 20px from top, horizontally centered; drop shadow for readability */}
        <div
          className="absolute left-1/2 -translate-x-1/2 z-10 pointer-events-auto"
          style={{ top: "20px" }}
        >
          {editingName ? (
            <input
              type="text"
              value={editNameValue}
              onChange={(e) => setEditNameValue(e.target.value)}
              onBlur={handleSaveTankName}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSaveTankName();
                if (e.key === "Escape") {
                  setEditNameValue(tankName ?? "");
                  setEditingName(false);
                }
              }}
              placeholder="Tank name"
              maxLength={80}
              autoFocus
              className="font-pixelify text-lg px-3 py-1.5 rounded-lg bg-black/30 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-highlight w-64"
              style={{ textShadow: "0 1px 3px rgba(0,0,0,0.6), 0 0 1px rgba(0,0,0,0.8)" }}
            />
          ) : (
            <button
              type="button"
              onClick={() => {
                setEditNameValue(tankName ?? "");
                setEditingName(true);
              }}
              className="font-pixelify text-lg text-white px-3 py-1.5 rounded-lg hover:bg-white/10 transition min-h-[2.25rem]"
              style={{ textShadow: "0 1px 3px rgba(0,0,0,0.6), 0 0 1px rgba(0,0,0,0.8)" }}
            >
              {tankName || "Name your tank"}
            </button>
          )}
        </div>
        <TVFrame
          wallpaper={wallpaper}
          onWallpaperChange={setWallpaper}
          onBubbleClick={handleBubbleClick}
        >
          <TankScreen wallpaper={wallpaper}>
            <BubbleLayer
              tankId={tankId}
              triggerBubbleAt={bubbleTriggerAt}
              members={members}
              currentDisplayName={currentMember?.display_name}
            />
            <div className="absolute inset-0 pointer-events-none">
              {members.map((member, index) => (
                <Fish
                  key={member.id}
                  member={member}
                  index={index}
                  totalMembers={members.length}
                />
              ))}
            </div>
          </TankScreen>
        </TVFrame>
      </div>
      <div className="fixed bottom-4 left-4 z-[100] pointer-events-auto flex items-center gap-3 p-4">
        <CreditFish theme={tvTheme} />
        {tankUrl && <ShareButton tankUrl={tankUrl} theme={tvTheme} />}
      </div>
    </main>
  );
}
