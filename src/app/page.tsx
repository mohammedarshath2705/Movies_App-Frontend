"use client";

import React, { useEffect, useState } from "react";

type Movie = {
  title: string;
  genre: string;
  language: string;
  overview: string;
  releaseDate: string;
  imdbRating: number;
  director: string;
  poster: string;
};

const MoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(0);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [filter, setFilter] = useState<string>("default");

  const fetchMovies = async () => {
    try {
      setLoading(true);
      setError(null);
  
      let url = `https://movies-app-backend-0r3l.onrender.com/movies/all?page=${page}&size=21`;
  
      if (filter === "imdb") {
        url = `https://movies-app-backend-0r3l.onrender.com/movies/byImdbRating?page=${page}&size=21`;
      } else if (filter === "release") {
        url = `https://movies-app-backend-0r3l.onrender.com/movies/byReleaseDate?page=${page}&size=21`;
      } else if (filter === "today release") {
        const today = new Date().toISOString().split("T")[0];
        url = `https://movies-app-backend-0r3l.onrender.com/movies/moviesByDate?date=${today}`;
  
        console.log("Fetching today's releases:", url);
        let response = await fetch(url);
        let text = await response.text();
  
        
        if (!text || text.trim() === "[]") {
          const yesterdayDate = new Date();
          yesterdayDate.setDate(yesterdayDate.getDate() - 1);
          const yesterday = yesterdayDate.toISOString().split("T")[0];
  
          url = `https://movies-app-backend-0r3l.onrender.com/movies/moviesByDate?date=${yesterday}`;
          console.log("No today's releases. Fetching yesterday's:", url);
          response = await fetch(url);
          text = await response.text();
        }
  
        if (!text || text.trim() === "[]") {
          setMovies([]);
          return;
        }
  
        const data = JSON.parse(text);
        setMovies(Array.isArray(data) ? data : data.content || []);
        return;
      }
  
      const response = await fetch(url);
      const text = await response.text();
      if (!text) {
        setMovies([]);
        return;
      }
  
      const data = JSON.parse(text);
      setMovies(Array.isArray(data) ? data : data.content || []);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setError("Failed to fetch movies.");
    } finally {
      setLoading(false);
    }
  };
  
  

  useEffect(() => {
    fetchMovies();
  }, [page, filter]);

  const openModal = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="container mx-auto p-4">
      {/* Filter Dropdown */}
      <div className="flex justify-end mb-4">
        <select
          value={filter}
          onChange={(e) => {
            setPage(0);
            setFilter(e.target.value);
          }}
          className="px-4 py-2 border rounded-md shadow-sm text-gray-700 bg-white"
        >
          <option value="default">Sort By</option>
          <option value="imdb">IMDb Rating</option>
          <option value="release">Release Date</option>
          <option value="today release">Today's Release</option>
        </select>
      </div>

      {loading && <p className="text-center text-gray-500">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && movies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {movies.map((movie) => (
            <div
              key={movie.title}
              className="border rounded-lg p-4 shadow-lg cursor-pointer text-center"
              onClick={() => openModal(movie)}
            >
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full h-60 object-cover rounded-md"
              />
              <h2 className="text-xl font-bold mt-2">{movie.title}</h2>
              <p className="text-gray-600">{movie.genre}</p>
              <p className="text-gray-500">IMDB Rating: {movie.imdbRating}</p>
            </div>
          ))}
        </div>
      ) : (
        !loading && (
          <p className="text-center text-gray-500">No movies found.</p>
        )
      )}

      {/* Pagination Controls */}
      {filter !== "today release" && (
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-x-4 sm:space-y-0 mt-8">
          <button
            disabled={page === 0}
            onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
            className="px-5 py-2 rounded-full border border-gray-300 text-gray-700 bg-white shadow-md transition duration-300 
               hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ← Previous
          </button>

          <span className="text-lg font-semibold px-4 py-2 bg-gray-100 rounded-md shadow">
            Page {page + 1}
          </span>

          <button
            onClick={() => setPage((prev) => prev + 1)}
            className="px-5 py-2 rounded-full border border-blue-500 text-white bg-blue-500 shadow-md transition duration-300 
               hover:bg-blue-600 hover:border-blue-600"
          >
            Next →
          </button>
        </div>
      )}

      {/* Movie Details Modal */}
      {selectedMovie && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-40 backdrop-blur-sm p-4">
          <div className="bg-gradient-to-r from-red-950 to-cyan-900 p-6 rounded-lg shadow-lg w-full max-w-lg max-h-[90vh] overflow-auto">
            <h2 className="text-3xl text-center font-extrabold mb-4 bg-gradient-to-r from-gray-500 to-blue-500 text-transparent bg-clip-text drop-shadow-md">
              {selectedMovie.title}
            </h2>

            <img
              src={selectedMovie.poster}
              alt={selectedMovie.title}
              className="w-full h-72 object-cover rounded-md mb-4"
            />

            <div className="text-center mt-4 space-y-2 bg-red-100 p-4 rounded-lg shadow-md">
              <p className="text-lg">
                <strong className="text-gray-800">Genre:</strong>{" "}
                {selectedMovie.genre}
              </p>
              <p className="text-lg">
                <strong className="text-gray-800">Language:</strong>{" "}
                {selectedMovie.language}
              </p>
              <p className="text-lg">
                <strong className="text-gray-800">Director:</strong>{" "}
                {selectedMovie.director}
              </p>
              <p className="text-lg">
                <strong className="text-gray-800">Release Date:</strong>{" "}
                {selectedMovie.releaseDate}
              </p>
              <p className="text-lg">
                <strong className="text-gray-800">IMDB Rating:</strong>{" "}
                {selectedMovie.imdbRating}
              </p>
            </div>

            <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-md">
              <p className="text-gray-800 text-lg leading-relaxed italic text-center">
                "{selectedMovie.overview}"
              </p>
            </div>

            <div className="flex justify-center mt-6">
              <button
                onClick={closeModal}
                className="px-6 py-3 bg-red-500 text-white rounded-lg font-semibold shadow-md hover:bg-red-600 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoviesPage;
