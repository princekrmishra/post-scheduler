// src/components/PostCard.jsx
import React from "react";
import { Send, Trash } from "lucide-react";
import { PLATFORMS } from "./utils";

export default function PostCard({ post, onDelete, onSendNow }) {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border">
      <div className="flex justify-between mb-2">
        <div className="text-sm text-gray-600">{new Date(post.scheduledAt).toLocaleString()}</div>
        <div className="flex gap-2">
          <button className="text-sm" onClick={() => onSendNow(post.id)} title="Send now" type="button">
            <Send size={16} />
          </button>
          <button className="text-sm text-red-500" onClick={() => onDelete(post.id)} title="Delete" type="button">
            <Trash size={16} />
          </button>
        </div>
      </div>
      <div className="mb-3 whitespace-pre-wrap">{post.content}</div>
      {post.image && <img src={post.image} alt="attachment" className="w-full rounded mb-3 object-contain" />}
      <div className="flex gap-2 flex-wrap">
        {post.platforms.map((p) => (
          <div key={p} className="px-2 py-1 rounded-full border text-xs">
            {PLATFORMS.find((x) => x.id === p)?.name}
          </div>
        ))}
      </div>
    </div>
  );
}
