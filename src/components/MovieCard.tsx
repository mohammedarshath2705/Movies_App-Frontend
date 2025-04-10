// components/MovieCard.tsx
import React from "react";
import { useRouter } from "next/navigation";
import { Movie } from "@/types/movie";

type MovieCardProps = {
  movie: Movie;
};

export function MovieCard({ movie }: MovieCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/movies/${movie.id}`);
  };

  return (
    <div
      className="rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer text-center bg-gray-700 max-w-xs"
      onClick={handleClick}
    >
      <img
        src={movie.poster}
        alt={movie.title}
        className="w-full h-40 object-cover rounded-t-lg"
      />
      <h2 className="text-sm font-medium mt-2 px-2 text-white mb-2 truncate">
        {movie.title}
      </h2>
    </div>
  );
}
