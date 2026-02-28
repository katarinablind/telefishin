"use client";

import { getWallpaperUrl, type WallpaperKey } from "@/lib/wallpaper";

interface TankScreenProps {
  wallpaper: WallpaperKey;
  children?: React.ReactNode;
}

export function TankScreen({ wallpaper, children }: TankScreenProps) {
  const url = getWallpaperUrl(wallpaper);

  return (
    <div
      className="absolute inset-0 bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: `url(${url})`, borderRadius: "200px" }}
    >
      {children}
    </div>
  );
}
