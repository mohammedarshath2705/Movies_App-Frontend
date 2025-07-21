import React from "react";
import Link from "next/link";
import { Movie } from "@/types/movie";
import MoviePoster from "./MoviePoster";

type MovieCardProps = {
  movie: Movie;
};

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <Link href={`/movies/${movie.id}`}>
      <div className="rounded-lg  shadow hover:shadow-lg transition cursor-pointer text-center bg-gray-700 max-w-xs">
        <MoviePoster
          src={movie.poster || "Placeholder.jpg"}
          alt={movie.title}
          className="w-full h-32 sm:h-36 md:h-40 object-cover rounded-t-lg"
        />
        <h2 className="text-sm font-medium mt-1 px-2 text-white mb-2 truncate">
          {movie.title}
        </h2>
        <h2 className="text-sm font-medium mt-1 px-2 text-white mb-2 truncate">
          ⭐ {movie.imdbRating}
        </h2>
      </div>
    </Link>
  );
}
