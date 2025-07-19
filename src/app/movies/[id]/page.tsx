import { getMovieById } from "@/services/movieService";
import { notFound } from "next/navigation";
import { Button } from "@/components/Button";
import { Metadata } from "next";
import MoviePoster from "@/components/MoviePoster";

type PageProps = {
  params: {
    id: string;
  };
};

export default async function MovieDetailPage({ params }: PageProps) {
   const movie = await getMovieById(params.id);
  if (!movie) notFound();
  
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col justify-between">
      {/* Button Container with proper spacing */}
      <div className="p-4 sm:p-6">
        <Button />
      </div>
      
      {/* Content Container with adjusted padding to account for button */}
      <div className="max-w-6xl mx-auto px-4 pb-10 pt-2 grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-10 flex-grow">
        <div>
          <MoviePoster
            src={movie.poster || "Placeholder.jpg"}
            alt={movie.title}
            className="w-full h-auto rounded-xl shadow-lg"
          />
        </div>
        
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
    </div>
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const movie = await getMovieById(params.id);
  
  if (!movie) {
    return {
      title: "Movie Not Found",
    };
  }
  
  return {
    title: movie.title,
    description: movie.overview,
  };
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <p className="text-base">
      <span className="font-semibold text-white">{label}:</span>{" "}
      <span className="text-gray-300">{value}</span>
    </p>
  );
}