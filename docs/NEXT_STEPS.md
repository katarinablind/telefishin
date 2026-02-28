# telefishin' — Next steps (when you get back)

Quick reminder of where things are and what’s left to do.

---

## Done so far

- **Landing:** telefishin' title + tagline, demo tank, **Create your fish tank** (outlined teal) and **Watch concept video** (YouTube link).
- **Tank page:** TV frame, fish (left→right infinite swim, staggered bobbing), wallpaper picker (light/dark/adaptive/disco/pixelated), power (TV off zoom), bubble button (insert + rate limit), BubbleLayer (realtime bubbles).
- **Join:** “Pick your sea animal” (first 7 options with image previews), **Join tank** outlined teal button. Share modal appears **only after the creator** clicks Join tank.
- **Share:** Share button (copy link) + credits fish in one aligned row bottom-left; share icon uses highlight color, same style as credits border.
- **Styling:** Highlight color = teal (`#27a5bb`). Outlined buttons that fill on hover. Pixel font (Pixelify Sans) for headings/UI. Page background via `--page-bg-tank` in `app/globals.css`.
- **Viewport:** “Please resize your window” message when too small (`components/ViewportGuard.tsx`).

---

## Next steps (to do later)

1. **TV renders per background**  
   Add different TV frame images for different wallpapers and wire them to the page background color (e.g. one frame + page tint per theme: light, dark, disco, etc.).

2. **Bubble button / bubbles**  
   Continue from current behavior (insert into `bubbles`, client rate limit, BubbleLayer with float-up animation). Ideas: optional “who sent” on hover, sound/haptic, limit or cleanup old rows in DB, small visual tweaks (size/speed/pop).

3. **Supabase (if using real backend)**  
   - Run `supabase/schema.sql` in SQL Editor if not already.  
   - For Realtime bubbles: add `bubbles` to the Realtime publication in Supabase so all clients see new bubbles without refresh.

---

## Key files

| What | Where |
|------|------|
| Landing page | `app/page.tsx` |
| Demo tank + CTAs | `components/landing/DemoTank.tsx` |
| Tank (TV + fish + join + share) | `components/tank/TankPage.tsx` |
| TV frame + power/background/bubble buttons | `components/tank/TVFrame.tsx` |
| Fish animation | `components/tank/Fish.tsx` |
| Join sheet (sea animal picker) | `components/tank/JoinSheet.tsx` |
| Share modal + share button | `components/tank/ShareModal.tsx`, `ShareButton.tsx` |
| Credits (who made this) | `components/tank/CreditFish.tsx` |
| Wallpaper options | `lib/wallpaper.ts` |
| Page background color | `app/globals.css` → `--page-bg-tank` |
| Highlight (teal) color | `tailwind.config.ts` → `colors.highlight`, `--highlight` in globals.css |
