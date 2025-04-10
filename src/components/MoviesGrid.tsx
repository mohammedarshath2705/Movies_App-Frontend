// components/MoviesGrid.tsx
import React from "react";
import { Movie } from "@/types/movie";
import { MovieCard } from "./MovieCard";

type MoviesGridProps = {
  movies: Movie[];
};

export function MoviesGrid({ movies }: MoviesGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 px-4">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
