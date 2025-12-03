// src/components/Queue.jsx
import React from "react";
import { PLATFORMS } from "./utils";

export default function Queue({ posts }) {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border">
      <h3 className="font-semibold mb-2">Queue (next 5)</h3>
      <div className="space-y-2">
        {posts
          .filter((p) => p.status !== "sent")
          .sort((a, b) => new Date(a.scheduledAt) - new Date(b.scheduledAt))
          .slice(0, 5)
          .map((p) => (
            <div key={p.id} className="flex items-start gap-3">
              <div className="text-sm text-gray-500">{new Date(p.scheduledAt).toLocaleTimeString()}</div>
              <div className="flex-1">
                <div className="text-sm font-medium truncate">{p.content}</div>
                <div className="text-xs text-gray-500">{p.platforms.map((x) => PLATFORMS.find((y) => y.id === x)?.name).join(", ")}</div>
              </div>
            </div>
          ))}
        {posts.filter((p) => p.status !== "sent").length === 0 && <div className="text-gray-500">Queue is empty</div>}
      </div>
    </div>
  );
}
