"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Movie, FilterType } from "@/types/movie";
import { fetchMoviesByFilter } from "@/services/movieService";

export function useMovies() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialFilter = (searchParams.get("filter") as FilterType) || "default";
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(0);
  const [filter, setFilter] = useState<FilterType>(initialFilter);

  useEffect(() => {
    async function loadMovies() {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchMoviesByFilter(filter, page);

        setMovies((prev) =>
          page === 0 ? data : [...prev, ...data.filter((d) => !prev.some((p) => p.id === d.id))]
        );
      } catch (error) {
        setError("Failed to fetch movies.");
      } finally {
        setLoading(false);
      }
    }

    loadMovies();
  }, [page, filter]);

  const changeFilter = (newFilter: FilterType) => {
    setPage(0);
    setMovies([]);
    setFilter(newFilter);

    const params = new URLSearchParams(window.location.search);
    params.set("filter", newFilter);
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return {
    movies,
    loading,
    error,
    page,
    setPage,
    filter,
    changeFilter,
  };
}
