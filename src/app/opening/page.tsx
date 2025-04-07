"use client";
import { Movie } from "./type";

const mockMovies: Movie[] = [
  {
    title: "10 Things I Hate About You",
    genre: "Comedy, Romance, Drama",
    language: "English",
    overview:
      "On the first day at his new school, Cameron instantly falls for Bianca, the gorgeous girl of his dreams. The only problem is that Bianca is forbidden to date until her ill-tempered, completely un-dateable older sister Kat goes out, too. In an attempt to solve his problem, Cameron singles out the only guy who could possibly be a match for Kat: a mysterious bad boy with a nasty reputation of his own.",
    releaseDate: "1999-03-30",
    imdbRating: 7.6,
    director: "Gil Junger",
    poster: "https://image.tmdb.org/t/p/w780/hqvYI3HxnRaewrD6oZWJkzdZfPB.jpg",
  },
  {
    title: "10,000 BC",
    genre: "Adventure, Action, Drama, Fantasy",
    language: "English",
    overview:
      "A prehistoric epic that follows a young mammoth hunter's journey through uncharted territory to secure the future of his tribe.",
    releaseDate: "2008-03-04",
    imdbRating: 5.5,
    director: "Roland Emmerich",
    poster: "https://image.tmdb.org/t/p/w780/jdmRey22HOSyfL44PbYYImZUk3L.jpg",
  },
  {
    title: "#Alive",
    genre: "Action, Horror",
    language: "Korean",
    overview:
      "As a grisly virus rampages a city, a lone man stays locked inside his apartment, digitally cut off from seeking help and desperate to find a way out.",
    releaseDate: "2020-06-24",
    imdbRating: 7.238,
    director: "Cho Il",
    poster: "https://image.tmdb.org/t/p/w780/k2SY15W9QXH9qL8f4a4BbytV1BE.jpg",
  },
];

export default function MoviesPage() {
  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {mockMovies.map((movie, index) => (
        <div key={index} className="border p-4 rounded-lg shadow-lg">
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-full h-60 object-cover rounded-lg"
          />
          <h2 className="text-lg font-bold mt-2">{movie.title}</h2>
          <p className="text-sm text-gray-600">{movie.genre}</p>
          <p className="text-sm text-gray-600">🎬 Director: {movie.director}</p>
          <p className="text-sm text-gray-600">🌍 Language: {movie.language}</p>
          <p className="text-sm text-gray-600">📅 Release: {movie.releaseDate}</p>
          <p className="text-sm text-gray-600">{movie.overview}</p>
          <p className="text-lg font-semibold mt-2">⭐ {movie.imdbRating.toFixed(1)}</p>
        </div>
      ))}
    </div>
  );
}
