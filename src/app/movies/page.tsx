// app/movies/page.tsx
"use client";

import React, { useRef, useCallback, useEffect } from "react";
import { useMovies } from "@/hooks/useMovies";
import { MoviesGrid } from "@/components/MoviesGrid";
import { FilterDropdown } from "@/components/FilterDropdown";
import HomeLayout from "../home-layout";

export default function MoviesPage() {
  const {
    movies,
    loading,
    error,
    page,
    setPage,
    filter,
    changeFilter,
    selectedMovie,
    openMovieDetails,
    closeMovieDetails,
  } = useMovies();

  const observerRef = useRef<HTMLDivElement | null>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && !loading) {
        setPage((prev) => prev + 1);
      }
    },
    [loading, setPage]
  );

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "200px",
      threshold: 0,
    };

    const observer = new IntersectionObserver(handleObserver, option);
    if (observerRef.current) observer.observe(observerRef.current);

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [handleObserver]);

  return (

    <div className="min-h-screen w-full bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <FilterDropdown currentFilter={filter} onFilterChange={changeFilter} />

        {error && <p className="text-center text-red-500 mt-8">{error}</p>}

        <MoviesGrid movies={movies}  />

        {loading && <p className="text-center text-gray-400 mt-6">......</p>}

        <div ref={observerRef} className="h-10" />

        
      </div>
    </div>
  );
}
