// components/Button.tsx
"use client";

export function Button() {
  return (
    <button
      onClick={() => window.history.back()}
      className="bg-blue-600 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-700 transition"
    >
      ← Back
    </button>
  );
}
