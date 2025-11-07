"use client";

import React, { useRef, useCallback, useEffect } from "react";
import { useMovies } from "@/hooks/useMovies";
import { MoviesGrid } from "@/components/MoviesGrid";
import { FilterDropdown } from "@/components/FilterDropdown";

export default function MoviesPage() {
  const { movies, loading, setPage, filter, changeFilter } = useMovies();

  const observerRef = useRef<HTMLDivElement | null>(null);

  // ✅ Restore scroll on BACK (pageshow fires even when useEffect doesn't)
  useEffect(() => {
  const restoreScroll = (event: PageTransitionEvent | Event) => {
    const saved = sessionStorage.getItem("movies-scroll");

    if ((event as PageTransitionEvent).persisted || saved) {
      setTimeout(() => {
        window.scrollTo(0, parseInt(saved || "0", 10));
      }, 50);
    }
  };

  const saveScroll = () => {
    sessionStorage.setItem("movies-scroll", String(window.scrollY));
  };

  window.addEventListener("pageshow", restoreScroll);
  window.addEventListener("scroll", saveScroll);

  return () => {
    window.removeEventListener("pageshow", restoreScroll);
    window.removeEventListener("scroll", saveScroll);
  };
}, []);


  // ✅ Infinite scroll
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
    const current = observerRef.current;

    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [handleObserver]);

  return (
    <div className="min-h-screen w-full bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-4">

        {/* ✅ Filter Dropdown */}
        <FilterDropdown currentFilter={filter} onFilterChange={changeFilter} />

        {/* ✅ Movie Grid */}
        <MoviesGrid movies={movies} />

        {/* ✅ Loading indicator */}
        {loading && (
          <p className="text-center text-gray-400 mt-6">Loading...</p>
        )}

        {/* ✅ Infinite Scroll Trigger */}
        <div ref={observerRef} className="h-10" />
      </div>
    </div>
  );
}
