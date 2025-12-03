import React from "react";
import { PLATFORMS } from "./utils";

export default function PlatformChips({ selected = [], onToggle }) {
  return (
    <div className="flex gap-2 flex-wrap">
      {PLATFORMS.map((p) => {
        const active = selected.includes(p.id);
        return (
          <button
            key={p.id}
            onClick={() => onToggle(p.id)}
            className={`px-3 py-1 rounded-full border ${active ? "bg-indigo-600 text-white" : "bg-white text-gray-800"}`}
            type="button"
            aria-pressed={active}
          >
            {p.name}
          </button>
        );
      })}
    </div>
  );
}
