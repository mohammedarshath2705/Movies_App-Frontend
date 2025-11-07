"use client";

import { Search } from "lucide-react";
import { useState } from "react";

export default function SearchBar() {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (!query.trim()) return;
    window.location.href = `/movies/search?query=${encodeURIComponent(query.trim())}`;
  };

  return (
    <div className="relative w-full max-w-md">
      {/* Search Icon */}
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 w-5 h-5" />

      {/* IMDB-style search input */}
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        placeholder="Search movies..."
        className="
          w-full h-11 pl-12 pr-4
          rounded-full
          bg-gray-800 border border-gray-700 
          placeholder-gray-400 text-white
          shadow-md
          focus:outline-none focus:ring-2 focus:ring-yellow-500
          transition-all
        "
      />
    </div>
  );
}
