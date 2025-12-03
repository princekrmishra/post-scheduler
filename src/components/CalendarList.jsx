// src/components/CalendarList.jsx
import React, { useMemo } from "react";
import PostCard from "./PostCard";

export default function CalendarList({ posts, onDelete, onSendNow }) {
  const grouped = useMemo(() => {
    const map = {};
    posts.forEach((p) => {
      const day = new Date(p.scheduledAt).toDateString();
      if (!map[day]) map[day] = [];
      map[day].push(p);
    });
    const days = Object.keys(map).sort((a, b) => new Date(a) - new Date(b));
    return { map, days };
  }, [posts]);

  return (
    <div className="space-y-4">
      {grouped.days.length === 0 && <div className="text-gray-500">No scheduled posts</div>}
      {grouped.days.map((day) => (
        <div key={day}>
          <h3 className="text-sm font-semibold mb-2">{day}</h3>
          <div className="grid grid-cols-1 gap-3">
            {grouped.map[day]
              .sort((a, b) => new Date(a.scheduledAt) - new Date(b.scheduledAt))
              .map((p) => (
                <PostCard key={p.id} post={p} onDelete={onDelete} onSendNow={onSendNow} />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
