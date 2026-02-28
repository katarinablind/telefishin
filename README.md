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

## Features

- **No accounts** — Join a tank via link; identity is a device ID in localStorage.
- **Tanks** — Create a tank, get a shareable URL; everyone with the link sees the same tank.
- **Join flow** — On first visit, a sheet lets you pick a fish type (1–11), optional name and city; timezone is read from the browser. Members are upserted by tank + device ID.
- **Fish** — One fish per member in the tank; swim, bob, glow; day/night styling based on each member’s timezone.
- **Bubbles** — A button sends a “bubble ping” (rate limited). Bubbles are stored in Supabase, synced in realtime, and animated (float up, fade) for everyone in the tank.
- **Realtime** — Supabase channel for `members` and `bubbles` by `tank_id` so new fish and bubbles appear for all viewers.
- **TV + wallpaper** — Tank is shown inside a TV-style frame; you can pick from several background wallpapers (stored in localStorage).

**Tech:** App Router, Tailwind, Supabase (Postgres + Realtime), optional in-memory mock when `NEXT_PUBLIC_USE_MOCK_SUPABASE=true`. Schema and RLS in `supabase/schema.sql`.

---

## Project layout

```
app/
  layout.tsx, globals.css
  page.tsx              # Landing
  create/page.tsx        # Create tank → redirect
  t/[tankId]/page.tsx   # Tank route
components/tank/
  TankPage.tsx          # Data + subscriptions + TV
  TVFrame.tsx           # TV overlay + screen rect + wallpaper picker
  TankScreen.tsx        # Background + fish + bubbles
  WallpaperPicker.tsx
lib/
  supabase/client.ts    # Real or mock
  supabase/mock.ts      # In-memory when USE_MOCK_SUPABASE=true
  deviceId.ts, dayNight.ts, wallpaper.ts, tvLayout.ts
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
