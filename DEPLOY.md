# Publishing Telefishin'

Checklist to take the app from local to production.

---

## 1. Supabase (production)

- Use a **Supabase project** for production (you can use the same one as dev or create a new one).
- In **SQL Editor**, run the full **`supabase/schema.sql`** (tables, RLS, realtime for `bubbles`).  
  If you already ran it, ensure the realtime line has been run at least once:
  ```sql
  alter publication supabase_realtime add table public.bubbles;
  ```
  (If it errors with "already in publication", you can ignore it.)
- In **Settings → API**, note your **Project URL** and **anon public** key for the next step.

---

## 2. Hosting (e.g. Vercel)

1. **Push your code** to GitHub (or GitLab/Bitbucket).  
   Ensure **`.env.local` is not committed** (it’s in `.gitignore`).

2. **Create a project** on [Vercel](https://vercel.com) (or Netlify, etc.) and **import** your repo.

3. **Environment variables** (in the host’s project settings):
   - `NEXT_PUBLIC_SUPABASE_URL` = your Supabase Project URL  
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your Supabase anon public key  
   Do **not** set `NEXT_PUBLIC_USE_MOCK_SUPABASE` in production (or set it to `false`).

4. **Deploy.**  
   Vercel will run `npm run build` and `npm run start` (or the platform’s equivalent). Your app will be live at a `*.vercel.app` URL.

5. **Optional:** Add a **custom domain** in the host’s dashboard.

---

## 3. Supabase URL allowlist (if needed)

If you add auth or redirects later, in Supabase: **Authentication → URL Configuration**, add your production URL (e.g. `https://your-app.vercel.app`) to **Site URL** and **Redirect URLs**. For the current no-auth setup this is optional.

---

## 4. Quick checks before sharing

- [ ] `npm run build` succeeds locally.
- [ ] Production env vars are set in the host (no mock).
- [ ] Schema (including realtime for `bubbles`) has been run in the production Supabase project.
- [ ] Create a tank and join on the deployed URL; send a bubble and confirm it appears.

---

## Summary

| Step | What to do |
|------|------------|
| **Supabase** | Run `supabase/schema.sql` in SQL Editor; enable realtime for `bubbles`. |
| **Host** | Connect repo, set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`, deploy. |
| **Optional** | Custom domain; Supabase URL allowlist if you add auth later. |

That’s enough to publish. Share the live URL so friends can open tanks and join as fish.
