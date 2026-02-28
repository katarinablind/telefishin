"use client";

import { useState } from "react";

interface ShareModalProps {
  tankUrl: string;
  onClose: () => void;
}

export function ShareModal({ tankUrl, onClose }: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  const copyUrl = () => {
    navigator.clipboard.writeText(tankUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/70"
        aria-hidden
        onClick={onClose}
      />
      <div
        className="relative w-full max-w-sm rounded-2xl bg-neutral-800 border border-neutral-600 shadow-xl p-6 font-pixelify"
        role="dialog"
        aria-labelledby="share-modal-title"
      >
        <h2 id="share-modal-title" className="text-xl text-white mb-2">
          Share this tank with your friends
        </h2>
        <p className="text-sm text-neutral-400 mb-4">
          Send them the link so they can join as a fish.
        </p>
        <div className="flex gap-2">
          <input
            type="text"
            readOnly
            value={tankUrl}
            className="flex-1 rounded-lg bg-neutral-700 border border-neutral-600 px-3 py-2 text-white text-sm truncate"
          />
          <button
            type="button"
            onClick={copyUrl}
            className="rounded-lg bg-highlight text-white px-4 py-2 hover:bg-highlight-500 transition whitespace-nowrap"
          >
            {copied ? "Copied!" : "Copy link"}
          </button>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="mt-4 w-full rounded-lg bg-neutral-700 text-white py-2 hover:bg-neutral-600 transition"
        >
          Done
        </button>
      </div>
    </div>
  );
}
