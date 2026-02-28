# Fish Tank Friends

A shared fish tank where long-distance friends appear as fish. No accounts—join via invite link. Bubble pings only; no chat.

**Stack:** Next.js (App Router), Tailwind, Supabase (Postgres + Realtime).

---

## Quick start

### 1. Install dependencies

```bash
cd telefishin   # or your path to the project folder
npm install
```

### 2. Environment variables

Copy the example and fill in your Supabase project (or use mock mode):

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:

- **Real Supabase:** Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` from your [Supabase](https://supabase.com) project → Settings → API.
- **Offline / no API:** Set `NEXT_PUBLIC_USE_MOCK_SUPABASE=true` to use an in-memory mock (no DB needed).

### 3. Run the dev server

```bash
npm run dev
```

Then open **http://localhost:3000** in your browser (if you see "Port 3000 is in use", use the port shown in the terminal, e.g. **http://localhost:3001**).

### 4. Supabase: connect the right project and create tables

- In [Supabase](https://supabase.com) open the project you want (e.g. **Telefishin**).
- **Settings → API:** copy **Project URL** and **anon public** key into `.env.local`:
  - `NEXT_PUBLIC_SUPABASE_URL=<Project URL>`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon public key>`
- **SQL Editor → New query:** paste the contents of **`supabase/schema.sql`** and run it. This creates `tanks`, `members`, `bubbles` and RLS. Without this, "Create a tank" will fail (e.g. "Failed to fetch" or relation does not exist).

### 5. Create a tank and join

- On the home page, click **Create a tank** (or go to `/create`). You’ll be redirected to `/t/[tankId]`.
- Share that URL; anyone with the link can open the same tank.

---

## What’s done so far

| Area | Status |
|------|--------|
| **Next.js + Tailwind** | ✅ App Router, `app/`, `globals.css`, Pixelify Sans font |
| **Supabase** | ✅ Client in `lib/supabase/client.ts`; mock client when `NEXT_PUBLIC_USE_MOCK_SUPABASE=true` |
| **Device ID** | ✅ `lib/deviceId.ts` — localStorage `ftf_device_id` for no-account identity |
| **Day/night helper** | ✅ `lib/dayNight.ts` — hour-based day/night per timezone (for fish glow) |
| **Landing page** | ✅ `app/page.tsx` — "Fish Tank Friends" + link to Create a tank |
| **Create tank** | ✅ `app/create/page.tsx` — inserts tank, redirects to `/t/[tankId]` |
| **Tank page** | ✅ `app/t/[tankId]/page.tsx` — loads tank + members, shows TV + screen |
| **TV frame** | ✅ `components/tank/TVFrame.tsx` — TV overlay, SCREEN_RECT from `lib/tvLayout.ts` |
| **Tank screen** | ✅ `components/tank/TankScreen.tsx` — background image (wallpaper) inside TV cutout |
| **Wallpaper picker** | ✅ `components/tank/WallpaperPicker.tsx` — 8 options, stored in `localStorage` (`ftf_wallpaper`) |
| **Backgrounds** | ✅ Images in `public/backgrounds/` (light, dark, blue-hour, sunrise, sunset, purple, pixel, disco) |
| **Schema / RLS** | ✅ Designed (tanks, members, bubbles with UUIDs; RLS policies) — run in Supabase SQL Editor |

**Not built yet (next steps):**

- **JoinSheet** — modal/sheet to pick fish type, name, city, timezone; upsert member by `(tank_id, device_id)`.
- **Fish component** — one fish per member; reuse prototype swim/bob/glow/sun-moon from `src/components/AnimatedFish.tsx`; day/night from member’s timezone.
- **Bubble button** — single button that inserts a bubble row; client-side rate limit.
- **BubbleLayer** — subscribe to bubbles (realtime or mock); animate bubbles float up and fade.
- **Realtime** — Supabase channel for `members` and `bubbles` by `tank_id` so all viewers see new fish and bubbles.

---

## Next steps (in order)

1. **Run schema in Supabase** (if using real DB)  
   Paste the full SQL (tables + indexes + RLS) into Supabase → SQL Editor → Run.

2. **JoinSheet**  
   When `currentMember` is null, show a sheet/modal: fish type (1–11), optional name, optional city, read-only timezone (from browser). On submit: `upsert` into `members` with `tank_id`, `device_id` from localStorage.

3. **Fish component**  
   Port logic from `src/components/AnimatedFish.tsx` (and fish assets from `src/components/Fish1.tsx`…`Fish11.tsx` or `src/assets`). Props: member’s `fish_type`, `display_name`, `city`, `timezone`. Use `isDayInTimezone(timezone)` for glow and sun/moon. Render inside `TankScreen`.

4. **Bubble button + BubbleLayer**  
   Button in tank UI that inserts into `bubbles` (with rate limit). Subscribe to new bubbles (realtime or mock); render in `BubbleLayer` with float-up + fade animation; remove from state after animation.

5. **Realtime subscriptions**  
   In `TankPage`, open a Supabase channel; listen for `INSERT`/`UPDATE` on `members` and `INSERT` on `bubbles` filtered by `tank_id`. Update `members` and bubble list state so all viewers stay in sync.

---

## Project layout (main pieces)

```
app/
  layout.tsx, globals.css
  page.tsx              # Landing
  create/page.tsx        # Create tank → redirect
  t/[tankId]/page.tsx   # Tank route
components/tank/
  TankPage.tsx          # Data + subscriptions + TV
  TVFrame.tsx           # TV overlay + screen rect + wallpaper picker
  TankScreen.tsx        # Background + (fish + bubbles)
  TankScreen.tsx
  WallpaperPicker.tsx
lib/
  supabase/client.ts    # Real or mock
  supabase/mock.ts      # In-memory when USE_MOCK_SUPABASE=true
  deviceId.ts
  dayNight.ts
  wallpaper.ts
  tvLayout.ts           # SCREEN_RECT for TV cutout
public/
  frame/tv.png
  backgrounds/*.png
```

---

## Red errors in the IDE (e.g. `src/App.tsx`)

The **`src/`** folder is the old **Figma/Vite prototype**. It uses imports like `figma:asset/...` and `motion/react` that don’t exist in the Next.js app, so the IDE shows errors there. The **running app** is the Next.js app in **`app/`** and **`components/`**; `src/` is excluded from the build and does not affect the dev server. You can close `src/App.tsx` or ignore those errors. To hide them, avoid opening files under `src/` or move the prototype into a subfolder and exclude it from the editor.

## Useful commands

| Command | Purpose |
|--------|--------|
| `npm run dev` | Start dev server (default port 3000, or next free e.g. 3001) |
| `npm run build` | Production build |
| `npm run start` | Run production build locally |
