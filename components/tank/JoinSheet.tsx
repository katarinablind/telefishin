"use client";

import { useState, useEffect } from "react";
import { TIMEZONE_OPTIONS } from "@/lib/timezones";
import { FISH_IMAGES } from "@/lib/fishAssets";

const SEA_ANIMAL_OPTIONS = 7;

interface JoinSheetProps {
  open: boolean;
  onSubmit: (data: {
    fish_type: number;
    display_name: string;
    city: string;
    timezone: string;
  }) => Promise<void>;
}

export function JoinSheet({ open, onSubmit }: JoinSheetProps) {
  const [fishType, setFishType] = useState(1);
  const [displayName, setDisplayName] = useState("");
  const [city, setCity] = useState("");
  const [timezone, setTimezone] = useState(TIMEZONE_OPTIONS[0]?.value ?? "America/New_York");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const detected = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const match = TIMEZONE_OPTIONS.find((o) => o.value === detected);
    setTimezone(match ? detected : TIMEZONE_OPTIONS[0].value);
  }, []);

  if (!open) return null;

  const nameTrim = displayName.trim();
  const cityTrim = city.trim();
  const canSubmit = nameTrim.length > 0 && cityTrim.length > 0 && timezone.length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!canSubmit) {
      setError("Name and city are required.");
      return;
    }
    setSubmitting(true);
    try {
      await onSubmit({
        fish_type: fishType,
        display_name: nameTrim,
        city: cityTrim,
        timezone,
      });
    } catch (err) {
      setError(String(err instanceof Error ? err.message : err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60"
        aria-hidden
      />
      <div
        className="relative w-full max-w-md rounded-2xl bg-neutral-800 border border-neutral-600 shadow-xl p-6"
        role="dialog"
        aria-labelledby="join-sheet-title"
      >
        <h2 id="join-sheet-title" className="font-pixelify text-xl text-white mb-4">
          Join the tank
        </h2>
        <p className="font-pixelify text-sm text-neutral-400 mb-6">
          Pick your sea animal and how you’d like to appear. Your timezone sets day or night at your place (change it if you're traveling).
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-pixelify text-sm text-neutral-300 mb-2">
              Pick your sea animal
            </label>
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: SEA_ANIMAL_OPTIONS }, (_, i) => {
                const n = i + 1;
                const src = FISH_IMAGES[i];
                return (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setFishType(n)}
                    className={`w-12 h-12 rounded-full overflow-hidden bg-cover bg-center border-2 transition flex-shrink-0 ${
                      fishType === n
                        ? "border-highlight ring-2 ring-highlight/50"
                        : "border-neutral-600 hover:border-neutral-500"
                    }`}
                    style={{ backgroundImage: src ? `url(${src})` : undefined }}
                    title={`Fish ${n}`}
                  />
                );
              })}
            </div>
          </div>

          <div>
            <label htmlFor="join-name" className="block font-pixelify text-sm text-neutral-300 mb-1">
              Name <span className="text-highlight">*</span>
            </label>
            <input
              id="join-name"
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="e.g. Alex"
              required
              className="w-full rounded-lg bg-neutral-700 border border-neutral-600 px-3 py-2 text-white font-pixelify placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-highlight"
            />
          </div>

          <div>
            <label htmlFor="join-city" className="block font-pixelify text-sm text-neutral-300 mb-1">
              City <span className="text-highlight">*</span>
            </label>
            <input
              id="join-city"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="e.g. Helsinki"
              required
              className="w-full rounded-lg bg-neutral-700 border border-neutral-600 px-3 py-2 text-white font-pixelify placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-highlight"
            />
          </div>

          <div>
            <label htmlFor="join-timezone" className="block font-pixelify text-sm text-neutral-300 mb-1">
              Timezone
            </label>
            <select
              id="join-timezone"
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="w-full rounded-lg bg-neutral-700 border border-neutral-600 px-3 py-2 text-white font-pixelify focus:outline-none focus:ring-2 focus:ring-highlight"
            >
              {TIMEZONE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <p className="font-pixelify text-neutral-500 text-xs mt-1">Defaults to your device; change if you're traveling.</p>
          </div>

          {error && (
            <p className="font-pixelify text-red-400 text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={submitting || !canSubmit}
            className="w-full rounded-xl border-2 border-highlight bg-transparent text-highlight font-pixelify py-3 hover:bg-highlight hover:text-white disabled:opacity-50 disabled:border-neutral-600 disabled:text-neutral-500 disabled:hover:bg-transparent transition"
          >
            {submitting ? "Joining…" : "Join tank"}
          </button>
        </form>
      </div>
    </div>
  );
}
