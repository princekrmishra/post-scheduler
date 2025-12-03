// src/App.jsx
import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Composer from "./components/Composer";
import CalendarList from "./components/CalendarList";
import Queue from "./components/Queue";
import Tips from "./components/Tips";
import { loadPosts, savePosts } from "./components/utils";

export default function App() {
  const [posts, setPosts] = useState(() => loadPosts());
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    savePosts(posts);
  }, [posts]);

  // Simple dispatcher simulation: mark scheduled posts ready when time arrives
  useEffect(() => {
    const timer = setInterval(() => {
      setPosts((prev) => {
        const now = new Date();
        let changed = false;
        const next = prev.map((p) => {
          if (p.status === "scheduled" && new Date(p.scheduledAt) <= now) {
            changed = true;
            return { ...p, status: "ready" };
          }
          return p;
        });
        return changed ? next : prev;
      });
    }, 1000 * 30);
    return () => clearInterval(timer);
  }, []);

  function createPost(post) {
    setPosts((p) => [post, ...p].sort((a, b) => new Date(a.scheduledAt) - new Date(b.scheduledAt)));
  }

  function deletePost(id) {
    setPosts((p) => p.filter((x) => x.id !== id));
  }

  function sendNow(id) {
    setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, status: "sent", sentAt: new Date().toISOString() } : p)));
    alert("(Demo) Post marked as sent — integrate real posting logic with platform APIs in production.");
  }

  const visible = posts.filter((p) => (filter === "all" ? true : p.status === filter));

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <Header />

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <Composer onCreate={createPost} />

            <div className="bg-white rounded-lg p-4 shadow-sm border">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <h2 className="text-lg font-semibold">Scheduled</h2>
                  <div className="text-sm text-gray-500">({visible.length})</div>
                </div>

                <div className="flex items-center gap-2">
                  <select value={filter} onChange={(e) => setFilter(e.target.value)} className="border rounded-md p-2">
                    <option value="all">All</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="ready">Ready to send</option>
                    <option value="sent">Sent</option>
                  </select>
                </div>
              </div>

              <CalendarList posts={visible} onDelete={deletePost} onSendNow={sendNow} />
            </div>
          </div>

          <aside className="space-y-4">
            <Queue posts={posts} />
            <Tips />
          </aside>
        </div>

        <footer className="mt-6 text-center text-sm text-gray-500">Demo Scheduler • Local-only (no external posting)</footer>
      </div>
    </div>
  );
}
