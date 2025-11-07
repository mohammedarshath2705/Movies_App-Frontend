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
    const savedFilter = sessionStorage.getItem("movies-filter");
    const savedMovies = sessionStorage.getItem("movies-list");
    const savedPage = sessionStorage.getItem("movies-page");

    if (savedFilter && savedMovies && savedPage) {
      setFilter(savedFilter as FilterType);
      setMovies(JSON.parse(savedMovies));
      setPage(Number(savedPage));
      return;
    }
  }, []);

  // ✅ Save scroll & movies before leaving
  useEffect(() => {
    const saveState = () => {
      sessionStorage.setItem("movies-list", JSON.stringify(movies));
      sessionStorage.setItem("movies-page", String(page));
      sessionStorage.setItem("movies-filter", filter);
      sessionStorage.setItem("movies-scroll", String(window.scrollY));
    };

    window.addEventListener("beforeunload", saveState);
    window.addEventListener("pagehide", saveState);

    return () => {
      saveState();
      window.removeEventListener("beforeunload", saveState);
      window.removeEventListener("pagehide", saveState);
    };
  }, [movies, page, filter]);

  // ✅ Fetch movies normally
  useEffect(() => {
    async function load() {
      setLoading(true);

      const data = await fetchMoviesByFilter(filter, page);

      setMovies((prev) =>
        page === 0 ? data : [...prev, ...data.filter((m) => !prev.some((p) => p.id === m.id))]
      );

      setLoading(false);
    }

    load();
  }, [filter, page]);

  // ✅ Changing filter resets everything BECAUSE user requested it
  const changeFilter = (newFilter: FilterType) => {
    sessionStorage.clear();
    setMovies([]);
    setPage(0);
    setFilter(newFilter);

    const params = new URLSearchParams(window.location.search);
    params.set("filter", newFilter);
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return { movies, loading, page, setPage, filter, changeFilter };
}
