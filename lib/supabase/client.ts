import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { createMockClient } from "./mock";

export function createClient() {
  if (process.env.NEXT_PUBLIC_USE_MOCK_SUPABASE === "true") {
    return createMockClient() as ReturnType<typeof createSupabaseClient>;
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY");
  }

  return createSupabaseClient(url, anonKey);
}
