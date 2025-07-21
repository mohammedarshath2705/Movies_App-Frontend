"use client";

import React, { useRef, useCallback, useEffect } from "react";
import { useMovies } from "@/hooks/useMovies";
import { MoviesGrid } from "@/components/MoviesGrid";
import { FilterDropdown } from "@/components/FilterDropdown";

export default function MoviesPage() {
  const {
    movies,
    loading,
    setPage,
    filter,
    changeFilter,
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
    const currentRef = observerRef.current;

    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [handleObserver]);

 
  return (
    <div className="min-h-screen w-full bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-4">
        
        <FilterDropdown currentFilter={filter} onFilterChange={changeFilter} />
        <MoviesGrid movies={movies} />
        {loading && <p className="text-center text-gray-400 mt-6">......</p>}
        <div ref={observerRef} className="h-10" />
        
      </div>
    </div>
  );
}
