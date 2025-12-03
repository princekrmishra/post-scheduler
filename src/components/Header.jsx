// src/components/Header.jsx
import React from "react";
import { CalendarDays, Plus } from "lucide-react";

export default function Header() {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <img
            src="logo.svg" 
            alt="logo" 
            className="w-12 h-12 object-contain" 
        />
        <div>
          <h1 className="text-2xl font-semibold">Scheduler</h1>
          <p className="text-sm text-muted-foreground">Compose, schedule and queue social posts</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 px-3 py-2 rounded-xl border hover:shadow-sm">
          <CalendarDays size={16} />
          Calendar
        </button>
        <button className="flex items-center gap-2 px-3 py-2 rounded-xl bg-indigo-600 text-white shadow hover:opacity-95">
          <Plus size={16} /> New Post
        </button>
      </div>
    </div>
  );
}
