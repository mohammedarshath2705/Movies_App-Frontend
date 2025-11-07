"use client";

import { useEffect, useState } from "react";
import { useRouter, notFound } from "next/navigation";
import { getMovieById } from "@/services/movieService";
import MoviePoster from "@/components/MoviePoster";
import {
  addToFavourites,
  removeFavourite,
  getFavourites,
} from "@/services/favouriteService";
import { Heart } from "lucide-react";
import { Movie } from "@/types/movie";

type PageProps = {
  params: { id: string };
};

export default function MovieDetailPage({ params }: PageProps) {
  const router = useRouter();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavourite, setIsFavourite] = useState(false);

  // ✅ Check Favourite
  const checkFavourite = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    const favs = await getFavourites(userId);
    if (!favs) return;

    setIsFavourite(favs.some((m: Movie) => m.id === params.id));
  };

  // ✅ Toggle Favourite
  const handleFavouriteToggle = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      router.push("/login");
      return;
    }

    if (isFavourite) {
      await removeFavourite(userId, params.id);
      setIsFavourite(false);
    } else {
      await addToFavourites(userId, params.id);
      setIsFavourite(true);
    }
  };

  // ✅ Fetch Movie (ignore warning)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (!token) {
      router.push("/login");
      return;
    }

    const load = async () => {
      try {
        const data = await getMovieById(params.id);
        if (!data) return notFound();

        setMovie(data);
        await checkFavourite();
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <p className="text-sm text-gray-400">Loading movie...</p>
      </div>
    );
  }

  if (!movie) return null;

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col justify-between">
      <div className="max-w-6xl mx-auto px-4 pb-10 pt-10 grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-10 flex-grow mt-10">

        {/* ✅ Poster */}
        <div>
          <MoviePoster
            src={movie.poster || "Placeholder.jpg"}
            alt={movie.title}
            className="w-full h-auto rounded-xl shadow-lg"
          />
        </div>

        {/* ✅ Movie Details */}
        <div className="space-y-3">
          <h1 className="text-xl md:text-2xl font-semibold text-blue-400">
            {movie.title}
          </h1>

          <p className="text-gray-300 text-sm leading-relaxed">
            {movie.overview}
          </p>

          <Detail label="Genre" value={movie.genre} />
          <Detail label="Language" value={movie.language} />
          <Detail label="Release Date" value={movie.releaseDate} />
          <Detail label="IMDB Rating" value={String(movie.imdbRating)} />
          <Detail label="Director" value={movie.director} />

          {/* ✅ Toggle Favourite */}
          <button
            onClick={handleFavouriteToggle}
            className={`
              flex items-center gap-2 w-fit
              px-3 py-1.5 rounded-lg text-xs sm:text-sm
              transition-all duration-300 active:scale-95
              border backdrop-blur-md shadow-sm hover:shadow-md
              ${
                isFavourite
                  ? "bg-red-600/20 border-red-500/40 text-red-400 hover:bg-red-600/30"
                  : "bg-gray-800/40 border-gray-600/40 text-gray-200 hover:bg-gray-700/40"
              }
            `}
          >
            <Heart
              className={`w-4 h-4 ${
                isFavourite
                  ? "fill-red-500 text-red-500 scale-110"
                  : "text-white"
              }`}
            />
            {isFavourite ? "Remove Favourite" : "Add to Favourite"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <p className="text-sm text-gray-300">
      <span className="font-medium text-white">{label}:</span> {value}
    </p>
  );
}
