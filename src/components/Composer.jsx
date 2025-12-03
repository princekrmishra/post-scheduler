import React, { useState } from "react";
import PlatformChips from "./PlatformChips";
import { uid, formatDateInput } from "./utils";

export default function Composer({ onCreate }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [platforms, setPlatforms] = useState(["twitter"]);
  const [scheduledAt, setScheduledAt] = useState(formatDateInput(new Date(Date.now() + 1000 * 60 * 60)));
  const [imageData, setImageData] = useState(null);

  function togglePlatform(id) {
    setPlatforms((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  function onFile(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => setImageData(reader.result);
    reader.readAsDataURL(f);
  }

  function submit(e) {
    e.preventDefault();
    if (!content.trim()) return alert("Please write some content");
    if (platforms.length === 0) return alert("Select at least one platform");
    const post = {
      id: uid("post"),
      title: title.trim(),
      content: content.trim(),
      platforms,
      scheduledAt: new Date(scheduledAt).toISOString(),
      createdAt: new Date().toISOString(),
      status: "scheduled",
      image: imageData,
    };
    onCreate(post);
    setTitle("");
    setContent("");
    setPlatforms(["twitter"]);
    setScheduledAt(formatDateInput(new Date(Date.now() + 1000 * 60 * 60)));
    setImageData(null);
  }

  return (
    <form onSubmit={submit} className="bg-white rounded-lg p-4 shadow-sm border">
      <h3 className="text-lg font-semibold mb-3">Create New Post</h3>

      <label className="block mb-2 text-sm">Title</label>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter post title" className="w-full border rounded-md p-2 mb-3" />

      <label className="block mb-2 text-sm">Content</label>
      <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="What's on your mind?" rows={4} className="w-full border rounded-md p-2 resize-none mb-3" />

      <label className="block mb-2 text-sm">Image (optional)</label>
      <div className="border-dashed border-2 border-gray-200 rounded p-4 mb-3 text-center">
        {imageData ? <img src={imageData} alt="preview" className="mx-auto max-h-40" /> : <div className="text-gray-400">No image selected</div>}
        <div className="mt-3">
          <input type="file" accept="image/*" onChange={onFile} />
        </div>
      </div>

      <label className="block mb-2 text-sm">Platforms</label>
      <PlatformChips selected={platforms} onToggle={togglePlatform} />

      <div className="mt-4 grid grid-cols-2 gap-3 items-end">
        <div>
          <label className="block text-sm mb-1">Date & Time</label>
          <input type="datetime-local" value={scheduledAt} onChange={(e) => setScheduledAt(e.target.value)} className="border rounded-md p-2 w-full" />
        </div>

        <div className="flex justify-end">
          <button type="submit" className="px-6 py-2 rounded bg-indigo-600 text-white">Schedule Post</button>
        </div>
      </div>
    </form>
  );
}
