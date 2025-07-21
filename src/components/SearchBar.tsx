"use client";

import { Search } from "lucide-react";

export default function SearchBar() {
  const handleSearch = (query: string) => {
    window.location.href = `/movies/search?query=${encodeURIComponent(query)}`;
  };

  return (
    <div className="flex items-center gap-2 w-full sm:max-w-sm">
      <Search className="text-white w-5 h-5" />
      <input
        type="text"
        placeholder="Search movies..."
        className="flex-1 p-2 h-10 rounded-lg border border-gray-700 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-blue-600-500"
        onKeyDown={(e) => e.key === "Enter" && handleSearch(e.currentTarget.value)}
      />
    </div>
  );
}
