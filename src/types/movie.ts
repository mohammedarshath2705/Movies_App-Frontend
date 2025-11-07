// types/movie.ts
export type Movie = {
  id: string;
  title: string;
  genre: string;
  language: string;
  overview: string;
  releaseDate: string;
  imdbRating: number;
  director: string;
  poster: string;
};

export type FilterType =
  | "default"
  | "imdb"
  | "release"
  | "today release"
  | "favourites";   
