/**
 * In-memory mock Supabase client for development when the real API is unavailable.
 * Set NEXT_PUBLIC_USE_MOCK_SUPABASE=true in .env.local to use.
 */

type RealtimePayload = { new: Record<string, unknown> };

const tanks = new Map<string, { id: string; name: string | null }>();
const membersByTank = new Map<string, Array<Record<string, unknown>>>();
const bubblesByTank = new Map<string, Array<Record<string, unknown>>>();

const membersListeners = new Map<string, Set<(p: RealtimePayload) => void>>();
const bubblesListeners = new Map<string, Set<(p: RealtimePayload) => void>>();

function notifyMembers(tankId: string, row: Record<string, unknown>) {
  membersListeners.get(tankId)?.forEach((cb) => cb({ new: row }));
}

function notifyBubbles(tankId: string, row: Record<string, unknown>) {
  bubblesListeners.get(tankId)?.forEach((cb) => cb({ new: row }));
}

export function createMockClient() {
  return {
    from(table: string) {
      if (table === "tanks") {
        return {
          insert(row: Record<string, unknown>) {
            const id = crypto.randomUUID();
            const name = (row.name as string) ?? null;
            tanks.set(id, { id, name });
            return {
              select: () => ({
                single: () => Promise.resolve({ data: { id, name }, error: null }),
              }),
            };
          },
          select: () => ({
            eq: (col: string, value: string) => ({
              single: () => {
                let t = tanks.get(value);
                if (!t) {
                  t = { id: value, name: null };
                  tanks.set(value, t);
                }
                return Promise.resolve({
                  data: { id: t.id, name: t.name },
                  error: null,
                });
              },
            }),
          }),
          update: (row: Record<string, unknown>) => ({
            eq: (col: string, value: string) => {
              const t = tanks.get(value);
              if (t && row.name !== undefined) {
                t.name = row.name as string | null;
                tanks.set(value, t);
              }
              return Promise.resolve({ error: null });
            },
          }),
        };
      }

      if (table === "members") {
        return {
          select: () => ({
            eq: (col: string, value: string) => ({
              order: (_col: string, opts: { ascending: boolean }) => ({
                then: (resolve: (r: { data: unknown[] }) => void) => {
                  const list = membersByTank.get(value) ?? [];
                  const sorted = [...list].sort((a, b) => {
                    const aT = String(a.created_at ?? "");
                    const bT = String(b.created_at ?? "");
                    return opts.ascending ? aT.localeCompare(bT) : bT.localeCompare(aT);
                  });
                  resolve({ data: sorted });
                  return Promise.resolve({ data: sorted });
                },
              }),
            }),
          }),
          upsert(
            row: Record<string, unknown> | Record<string, unknown>[],
            _opts?: { onConflict?: string }
          ) {
            const rows = Array.isArray(row) ? row : [row];
            let lastRow: Record<string, unknown> | null = null;
            for (const r of rows) {
              const tankId = String(r.tank_id);
              const deviceId = String(r.device_id);
              let list = membersByTank.get(tankId) ?? [];
              const existing = list.findIndex((m) => String(m.device_id) === deviceId);
              const newRow = {
                ...r,
                id: (r.id as string) ?? crypto.randomUUID(),
                created_at: (r.created_at as string) ?? new Date().toISOString(),
              };
              if (existing >= 0) {
                list = [...list];
                list[existing] = newRow;
              } else {
                list = [...list, newRow];
              }
              membersByTank.set(tankId, list);
              notifyMembers(tankId, newRow);
              lastRow = newRow;
            }
            return {
              select: () => ({
                single: () => Promise.resolve({ data: lastRow, error: null }),
              }),
            };
          },
          delete: () => ({
            eq: (col: string, value: string) => ({
              eq: (col2: string, value2: string) => {
                const tankId = col === "tank_id" ? value : value2;
                const deviceId = col === "device_id" ? value : value2;
                const list = membersByTank.get(tankId) ?? [];
                membersByTank.set(tankId, list.filter((m) => String(m.device_id) !== deviceId));
                return Promise.resolve({ error: null });
              },
            }),
          }),
        };
      }

      if (table === "bubbles") {
        return {
          insert(row: Record<string, unknown> | Record<string, unknown>[]) {
            const rows = Array.isArray(row) ? row : [row];
            for (const r of rows) {
              const tankId = String(r.tank_id);
              const newRow = {
                ...r,
                id: (r.id as string) ?? crypto.randomUUID(),
                created_at: (r.created_at as string) ?? new Date().toISOString(),
              };
              const list = bubblesByTank.get(tankId) ?? [];
              bubblesByTank.set(tankId, [...list, newRow]);
              notifyBubbles(tankId, newRow);
            }
            return Promise.resolve({ data: null, error: null });
          },
        };
      }

      return {};
    },

    removeChannel(_ch: unknown) {
      return Promise.resolve("ok" as const);
    },

    channel(_name: string) {
      const memberSubs: { filter?: string; cb: (p: RealtimePayload) => void }[] = [];
      const bubbleSubs: { filter?: string; cb: (p: RealtimePayload) => void }[] = [];

      return {
        on(
          _event: string,
          opts: { event?: string; table?: string; filter?: string },
          cb: (payload: RealtimePayload) => void
        ) {
          if (opts.table === "members" && opts.filter)
            memberSubs.push({ filter: opts.filter, cb });
          if (opts.table === "bubbles" && opts.filter)
            bubbleSubs.push({ filter: opts.filter, cb });
          return this;
        },
        subscribe() {
          memberSubs.forEach(({ filter, cb }) => {
            if (filter?.startsWith("tank_id=eq.")) {
              const tankId = filter.replace("tank_id=eq.", "").trim();
              let set = membersListeners.get(tankId);
              if (!set) {
                set = new Set();
                membersListeners.set(tankId, set);
              }
              set.add(cb);
            }
          });
          bubbleSubs.forEach(({ filter, cb }) => {
            if (filter?.startsWith("tank_id=eq.")) {
              const tankId = filter.replace("tank_id=eq.", "").trim();
              let set = bubblesListeners.get(tankId);
              if (!set) {
                set = new Set();
                bubblesListeners.set(tankId, set);
              }
              set.add(cb);
            }
          });
          return { status: "SUBSCRIBED" };
        },
      };
    },
  };
}
