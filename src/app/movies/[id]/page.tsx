import { getMovieById } from "@/services/movieService";
import { notFound } from "next/navigation";
import { Button } from "@/components/Button";

type MoviePageProps = {
  params: { id: string };
};

export default async function MovieDetailPage({ params }: MoviePageProps) {
  const movie = await getMovieById(params.id);
  if (!movie) notFound();

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col justify-between">
      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-10 flex-grow">
        {/* Left: Movie Poster */}
        <div>
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-full h-auto rounded-xl shadow-lg"
          />
        </div>

        {/* Right: Line-by-line details */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-blue-400">{movie.title}</h1>

          <p className="text-gray-300 text-base leading-relaxed">
            {movie.overview}
          </p>

          <Detail label="Genre" value={movie.genre} />
          <Detail label="Language" value={movie.language} />
          <Detail label="Release Date" value={movie.releaseDate} />
          <Detail label="IMDB Rating" value={String(movie.imdbRating)} />
          <Detail label="Director" value={movie.director} />
        </div>
      </div>

      {/* Bottom Back Button */}
      <div className="px-6 pb-6">
        <Button />
      </div>
    </div>
  );
}

// Helper component for styling each detail line
function Detail({ label, value }: { label: string; value: string}) {
  return (
    <p className="text-base">
      <span className="font-semibold text-white">{label}:</span>{" "}
      <span className="text-gray-300">{value}</span>
    </p>
  );
}
