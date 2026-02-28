/** Fish asset filenames in public/assets/ — used for tank fish and join-sheet previews */
export const FISH_ASSET_HASHES = [
  "bb06dd504635a697cb4f0d657256f8beeda19a79.png", // 1
  "cbe27a4cafa56d123990a405434e12d8bfa684e9.png",
  "9914ebe650bf556ad948759f92f9be62915bd20a.png",
  "8f19a7ec51741eec3ee9bdd4a3f86dae6977d744.png",
  "9aa616d977281cb90f7454dabdd336ff9af94f2c.png",
  "ede4658239e911105b7b176c3d862de2a1458f58.png",
  "aa2523635365002931109eabfcb9c0b37dd2bef4.png",
  "dcc93aa4513a4aa063f80e3995f245a4326a4c2e.png",
  "0849fd07e7a89b0c135e30ad68cf1e1fcdc80cc9.png", // 9 (shrimp)
  "0849fd07e7a89b0c135e30ad68cf1e1fcdc80cc9.png", // 10 reuse
  "e92309206d8ffd69c155ce53aedfd0360bcfe392.png", // 11
] as const;

export const FISH_IMAGES = FISH_ASSET_HASHES.map((h) => `/assets/${h}`);

export const FISH_OPTIONS_COUNT = FISH_IMAGES.length;
