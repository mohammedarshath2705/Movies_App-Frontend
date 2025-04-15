"use client";

export function Button() {
  return (
    <button
      onClick={() => window.history.back()}
      className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
    >
      ← Back
    </button>
  );
}
