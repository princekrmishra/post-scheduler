// src/components/Tips.jsx
import React from "react";

export default function Tips() {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border">
      <h3 className="font-semibold mb-2">Tips</h3>
      <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
        <li>Use different copy for each platform (image-first on Instagram, short copy on X).</li>
        <li>Schedule during high-engagement hours for your audience.</li>
        <li>Integrate with a backend and OAuth for production posting.</li>
      </ul>
    </div>
  );
}

