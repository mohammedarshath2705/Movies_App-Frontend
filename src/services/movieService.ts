// services/movieService.ts
import { Movie } from "@/types/movie";

const API_BASE_URL = "https://movies-app-backend-0r3l.onrender.com/movies";

export async function fetchMoviesByFilter(filter: string, page: number, size: number = 20): Promise<Movie[]> {
  try {
    let url = `${API_BASE_URL}/all?page=${page}&size=${size}`;

    if (filter === "imdb") {
      url = `${API_BASE_URL}/byImdbRating?page=${page}&size=${size}`;
    } else if (filter === "release") {
      url = `${API_BASE_URL}/byReleaseDate?page=${page}&size=${size}`;
    } else if (filter === "today release") {
      return await fetchTodayReleases();
    }

    const response = await fetch(url);
    const text = await response.text();
    
    if (!text) {
      return [];
    }

    const data = JSON.parse(text);
    return Array.isArray(data) ? data : data.content || [];
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw new Error("Failed to fetch movies.");
  }
}

async function fetchTodayReleases(): Promise<Movie[]> {
  const today = new Date().toISOString().split("T")[0];
  let url = `${API_BASE_URL}/moviesByDate?date=${today}`;
  
  console.log("Fetching today's releases:", url);
  let response = await fetch(url);
  let text = await response.text();

  if (!text || text.trim() === "[]") {
    const yesterdayDate = new Date();
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);
    const yesterday = yesterdayDate.toISOString().split("T")[0];

    url = `${API_BASE_URL}/moviesByDate?date=${yesterday}`;
    console.log("No today's releases. Fetching yesterday's:", url);
    response = await fetch(url);
    text = await response.text();
  }

  if (!text || text.trim() === "[]") {
    return [];
  }

  const data = JSON.parse(text);
  return Array.isArray(data) ? data : data.content || [];
}

export async function getMovieById(id: string): Promise<Movie | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`);

    if (!response.ok) {
      console.error("Failed to fetch movie by ID:", id);
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movie by ID:", error);
    return null;
  }
}
