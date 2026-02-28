# Join sheet – instructions

## What it is

The **Join sheet** is the modal that appears when you open a tank **and this device hasn’t joined yet**. It lets the user:

- Choose a **fish type** (1–11)
- Optionally set **name** and **city** (shown on their fish)
- See their **timezone** (auto-detected from the browser; used for day/night on their fish)

After they click **“Join tank”**, the app saves (or updates) their row in the `members` table and closes the sheet. They then count as “in” the tank on this device.

---

## What you do in the app

1. Open a tank (e.g. from “Create a tank” or an invite link `/t/[tankId]`).
2. If you’re not a member yet, the Join sheet appears.
3. Pick fish 1–11, optionally name and city; timezone is filled automatically.
4. Click **“Join tank”**.
5. The sheet closes and the tank view is shown (fish/bubbles will appear once those features are built).

If you leave and come back on the **same browser/device**, you won’t see the Join sheet again (you’re already a member for that tank).

---

## What you need to do in Supabase

**Nothing extra** if you already ran the full `supabase/schema.sql` in the SQL Editor.

That script creates:

- The **`members`** table with: `id`, `tank_id`, `device_id`, `display_name`, `city`, `timezone`, `fish_type`, `created_at`, `last_seen_at`
- A **unique constraint** on `(tank_id, device_id)` so each device can have at most one member per tank
- **RLS policies** so the app can:
  - **SELECT** all members (to show fish)
  - **INSERT** and **UPDATE** members (so the Join sheet can add/update by `tank_id` + `device_id`)

The Join sheet uses **upsert**: if a row for that `tank_id` + `device_id` already exists, it’s updated; otherwise a new row is inserted. No new tables or policies are required.

### If you haven’t run the schema yet

1. In Supabase: **SQL Editor → New query**.
2. Paste the full contents of **`supabase/schema.sql`** from this repo.
3. Click **Run**.
4. Then use the app as above; the Join sheet will work.

### If you added the project later

Make sure **`.env.local`** points at the same project where you ran the schema:

- **Settings → API** in that project: copy **Project URL** and **anon public** key.
- Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in `.env.local`.

No other Supabase setup is needed for the Join sheet.
