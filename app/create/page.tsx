"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function CreateTankPage() {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "creating" | "done" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status !== "idle") return;
    setStatus("creating");
    const supabase = createClient();
    const tankName = name.trim() || null;
    try {
      let result = await supabase
        .from("tanks")
        .insert(tankName != null ? { name: tankName } : {})
        .select("id")
        .single();
      // If "name" column doesn't exist yet (schema not migrated), retry without name
      if (result.error && /name.*column|column.*name/i.test(result.error.message)) {
        result = await supabase.from("tanks").insert({}).select("id").single();
      }
      if (result.error) {
        setStatus("error");
        setErrorMessage(result.error.message);
        return;
      }
      if (result.data?.id) {
        setStatus("done");
        router.replace(`/t/${result.data.id}?share=1`);
      } else {
        setStatus("error");
        setErrorMessage("No tank id returned");
      }
    } catch (err) {
      setStatus("error");
      const msg = err instanceof Error ? err.message : String(err);
      const isNetwork = /fetch|network|failed to fetch/i.test(msg);
      setErrorMessage(
        isNetwork
          ? "Could not reach Supabase. Check .env.local (URL + anon key) and that you ran supabase/schema.sql in the SQL Editor."
          : msg
      );
    }
  };

  if (status === "creating" || status === "done") {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-white">
        <p className="font-pixelify text-xl text-black">Creating your tank...</p>
      </main>
    );
  }

  if (status === "error") {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-white">
        <p className="font-pixelify text-xl text-red-600 mb-4">Something went wrong</p>
        <p className="text-sm text-neutral-700 max-w-md text-center mb-6 font-sans">
          {errorMessage}
        </p>
        <a href="/" className="font-pixelify text-highlight hover:underline">
          Back to home
        </a>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-white">
      <h1 className="font-pixelify text-2xl text-black mb-6">Create your fish tank</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-sm flex flex-col gap-4">
        <label htmlFor="tank-name" className="block font-pixelify text-sm text-neutral-800">
          Tank name <span className="text-neutral-500">(optional)</span>
        </label>
        <input
          id="tank-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Undergrad Roomies"
          maxLength={80}
          className="font-pixelify w-full rounded-xl bg-neutral-100 border border-neutral-300 px-4 py-3 text-black placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-highlight focus:border-highlight"
        />
        <button
          type="submit"
          className="font-pixelify w-full rounded-xl border-2 border-highlight bg-transparent text-highlight py-3 hover:bg-highlight hover:text-white transition"
        >
          Create tank
        </button>
      </form>
      <a
        href="/"
        className="font-pixelify text-sm text-neutral-600 hover:text-black mt-6 underline"
      >
        Back to home
      </a>
    </main>
  );
}
