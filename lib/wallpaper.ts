export const WALLPAPER_OPTIONS = [
  "light",
  "dark",
  "adaptive",
  "disco",
  "pixelated",
] as const;

export type WallpaperKey = (typeof WALLPAPER_OPTIONS)[number];

export const WALLPAPER_STORAGE_KEY = "ftf_wallpaper";

/**
 * Adaptive time bands (local hour). Used for both background image and TV theme.
 * - Morning: 5–7 (sunrise.png)
 * - Noon: 7–12 (light.png)
 * - Afternoon: 12–17 (light.png)
 * - Early evening: 17–19 (sunset.png)
 * - Evening (purple): 19–22 (purple.png)
 * - Night: 22–5 (dark.png)
 */
export const ADAPTIVE_HOURS = {
  morningStart: 5,
  noonStart: 7,
  afternoonStart: 12,
  earlyEveningStart: 17,
  eveningStart: 19,
  nightStart: 22,
} as const;

export type AdaptivePhase =
  | "morning"
  | "noon"
  | "afternoon"
  | "early evening"
  | "evening"
  | "night";

/** Resolve current adaptive phase from local hour. */
export function getAdaptivePhase(): AdaptivePhase {
  const hour = new Date().getHours();
  if (hour >= ADAPTIVE_HOURS.nightStart || hour < ADAPTIVE_HOURS.morningStart) return "night";
  if (hour < ADAPTIVE_HOURS.noonStart) return "morning";
  if (hour < ADAPTIVE_HOURS.afternoonStart) return "noon";
  if (hour < ADAPTIVE_HOURS.earlyEveningStart) return "afternoon";
  if (hour < ADAPTIVE_HOURS.eveningStart) return "early evening";
  if (hour < ADAPTIVE_HOURS.nightStart) return "evening";
  return "night";
}

export function getWallpaperUrl(
  key: WallpaperKey,
  options?: { isDay?: boolean; phase?: AdaptivePhase }
): string {
  if (key === "adaptive") {
    const phase =
      options?.phase ??
      (typeof options?.isDay === "boolean"
        ? options.isDay
          ? "noon"
          : "night"
        : getAdaptivePhase());
    if (phase === "morning") return "/backgrounds/sunrise.png";
    if (phase === "noon" || phase === "afternoon") return "/backgrounds/light.png";
    if (phase === "early evening") return "/backgrounds/sunset.png";
    if (phase === "evening") return "/backgrounds/purple.png";
    return "/backgrounds/dark.png"; // night
  }
  const file = key === "pixelated" ? "pixel" : key;
  return `/backgrounds/${file}.png`;
}

/** TV theme: light (light + sunrise), dark (dark + sunset + purple), blue (pixel), purple (disco) */
export type TvThemeKey = "light" | "dark" | "blue" | "purple";

const WALLPAPER_TO_TV_THEME: Record<WallpaperKey, TvThemeKey> = {
  light: "light",
  dark: "dark",
  adaptive: "light", // resolved at runtime by hour
  disco: "purple",
  pixelated: "blue",
};

/** Resolve wallpaper to TV theme (adaptive uses morning/noon/afternoon/early evening/evening/night). Evening (purple bg) uses dark TV. */
export function getTvTheme(wallpaper: WallpaperKey, phaseOverride?: AdaptivePhase): TvThemeKey {
  if (wallpaper === "adaptive") {
    const phase = phaseOverride ?? getAdaptivePhase();
    if (phase === "morning" || phase === "noon" || phase === "afternoon") return "light";
    if (phase === "early evening" || phase === "night" || phase === "evening") return "dark";
    return "dark";
  }
  return WALLPAPER_TO_TV_THEME[wallpaper];
}

/** TV frame image path per theme. */
export const TV_FRAME_PATHS: Record<TvThemeKey, string> = {
  light: "/frame/tv-light.png",
  dark: "/frame/tv-dark.png",
  blue: "/frame/tv-blue.png",
  purple: "/frame/tv-purple.png",
};

/** Page background color per theme (tank page only). */
export const PAGE_BG_BY_THEME: Record<TvThemeKey, string> = {
  light: "#DFD9D4",
  dark: "#292828",
  blue: "#46BED7",
  purple: "#BC6AE8",
};
