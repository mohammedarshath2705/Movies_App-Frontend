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
  const [page, setPage] = useState<number>(0);
  const [filter, setFilter] = useState<FilterType>(initialFilter);

  useEffect(() => {
    async function loadMovies() {
      try {
        setLoading(true);

        const data = await fetchMoviesByFilter(filter, page);

        setMovies((prev) =>
          page === 0 ? data : [...prev, ...data.filter((d) => !prev.some((p) => p.id === d.id))]
        );
      } catch (error) {
        console.error("Failed to fetch movies:", error);  // Log error if needed
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
    page,
    setPage,
    filter,
    changeFilter,
  };
}
