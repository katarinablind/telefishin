"use client";

import { useState, useEffect } from "react";

const MIN_WIDTH = 380;
const MIN_HEIGHT = 520;

export function ViewportGuard({ children }: { children: React.ReactNode }) {
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    const check = () => {
      setSupported(
        typeof window !== "undefined" &&
          window.innerWidth >= MIN_WIDTH &&
          window.innerHeight >= MIN_HEIGHT
      );
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (!supported) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-[var(--page-bg-tank)]">
        <p className="font-pixelify text-center text-white max-w-sm">
          Please resize your window. This size is currently not supported.
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
