# Fish and sun/moon assets

The Fish component expects these image files in **`public/assets/`**. Copy them from the prototype **`src/assets/`** (same filenames).

## Files to copy

From `src/assets/` → `public/assets/` (create `public/assets/` if it doesn’t exist):

**Fish (1–11):**
- `bb06dd504635a697cb4f0d657256f8beeda19a79.png`
- `cbe27a4cafa56d123990a405434e12d8bfa684e9.png`
- `9914ebe650bf556ad948759f92f9be62915bd20a.png`
- `8f19a7ec51741eec3ee9bdd4a3f86dae6977d744.png`
- `9aa616d977281cb90f7454dabdd336ff9af94f2c.png`
- `ede4658239e911105b7b176c3d862de2a1458f58.png`
- `aa2523635365002931109eabfcb9c0b37dd2bef4.png`
- `dcc93aa4513a4aa063f80e3995f245a4326a4c2e.png`
- `0849fd07e7a89b0c135e30ad68cf1e1fcdc80cc9.png`
- (Fish10 reuses Fish9’s image in code; no extra file)
- `e92309206d8ffd69c155ce53aedfd0360bcfe392.png`

**Sun and moon:**
- `2e83eebfb0194169db403e3654fd3fc63b713e09.png` (sun)
- `fec3ab7383de166cf6914526dd3da03d6e1a4850.png` (moon)

## One-time setup (terminal)

From the project root:

```bash
mkdir -p public/assets
cp src/assets/bb06dd504635a697cb4f0d657256f8beeda19a79.png \
   src/assets/cbe27a4cafa56d123990a405434e12d8bfa684e9.png \
   src/assets/9914ebe650bf556ad948759f92f9be62915bd20a.png \
   src/assets/8f19a7ec51741eec3ee9bdd4a3f86dae6977d744.png \
   src/assets/9aa616d977281cb90f7454dabdd336ff9af94f2c.png \
   src/assets/ede4658239e911105b7b176c3d862de2a1458f58.png \
   src/assets/aa2523635365002931109eabfcb9c0b37dd2bef4.png \
   src/assets/dcc93aa4513a4aa063f80e3995f245a4326a4c2e.png \
   src/assets/0849fd07e7a89b0c135e30ad68cf1e1fcdc80cc9.png \
   src/assets/e92309206d8ffd69c155ce53aedfd0360bcfe392.png \
   src/assets/2e83eebfb0194169db403e3654fd3fc63b713e09.png \
   src/assets/fec3ab7383de166cf6914526dd3da03d6e1a4850.png \
   public/assets/
```

If any filename is missing in `src/assets/`, copy only the ones that exist.
