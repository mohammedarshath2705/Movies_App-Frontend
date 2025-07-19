"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { MoviesGrid } from "@/components/MoviesGrid";
import { searchMoviesByTitle, } from "@/services/movieService";
import { Movie } from "@/types/movie";

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="text-center text-gray-400 mt-6">Loading search results...</div>}>
      <SearchContent />
    </Suspense>
  );
}

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      const data = await searchMoviesByTitle(query);
      setMovies(data);
      setLoading(false);
    };
    fetchMovies();
  }, [query]);

  return (
    <div className="min-h-screen w-full bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl mb-4">Search Results for: {query}</h1>
        <MoviesGrid movies={movies} />
        {loading && <p className="text-center text-gray-400 mt-6">......</p>}
      </div>
    </div>
  );
}
