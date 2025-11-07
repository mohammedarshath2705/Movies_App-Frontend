import { Movie } from "@/types/movie";
import { getFavourites } from "./favouriteService";
import { MOVIES_URL } from "@/lib/config";


export async function fetchMoviesByFilter(
  filter: string,
  page: number,
  size: number = 20
): Promise<Movie[]> {
  try {
    let url = `${MOVIES_URL}/all?page=${page}&size=${size}`;

    if (filter === "imdb") {
  url = `${MOVIES_URL}/byImdbRating?page=${page}&size=${size}`;
} 
else if (filter === "release") {
  url = `${MOVIES_URL}/byReleaseDate?page=${page}&size=${size}`;
} 
else if (filter === "today release") {
  return await fetchTodayReleases();
} 
else if (filter === "favourites") {
  const userId = localStorage.getItem("userId");
  if (!userId) return [];
  const favs = await getFavourites(userId);
  return favs || [];
}


    const response = await fetch(url);
    const text = await response.text();

    if (!text.trim()) return [];

    const data = JSON.parse(text);
    return Array.isArray(data) ? data : data.content || [];

  } catch (error) {
    console.error("Error fetching movies:", error);
    throw new Error("Failed to fetch movies.");
  }
}

/**
 * ✅ FETCH Today’s Releases (fallback to yesterday)
 */
async function fetchTodayReleases(): Promise<Movie[]> {
  try {
    const today = new Date().toISOString().split("T")[0];
    let url = `${MOVIES_URL}/moviesByDate?date=${today}`;
    
    console.log("Fetching today's releases:", url);
    let response = await fetch(url);
    let text = await response.text();

    // Check for today's releases, otherwise try yesterday
    if (!text || text.trim() === "[]") {
      const yesterdayDate = new Date();
      yesterdayDate.setDate(yesterdayDate.getDate() - 1);
      const yesterday = yesterdayDate.toISOString().split("T")[0];

      url = `${MOVIES_URL}/moviesByDate?date=${yesterday}`;
      console.log("No today's releases. Fetching yesterday's:", url);
      response = await fetch(url);
      text = await response.text();
    }

    // Return an empty array if no releases found
    if (!text || text.trim() === "[]") {
      return [];
    }

    const data = JSON.parse(text);
    return Array.isArray(data) ? data : data.content || [];
  } catch (error) {
    console.error("Error fetching today's releases:", error);
    return [];
  }
}

/**
 * ✅ GET Movie by ID (Protected - Requires JWT)
 */
export async function getMovieById(id: string): Promise<Movie | null> {
  const token = localStorage.getItem("jwt");

  if (!token) {
    console.error("❌ No JWT found");
    return null;
  }

  try {
    const response = await fetch(`${MOVIES_URL}/${id}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    if (!response.ok) {
      console.error("❌ Error fetching movie:", response.status);
      return null;
    }

    return await response.json();

  } catch (error) {
    console.error("❌ Exception fetching movie:", error);
    return null;
  }
}

/**
 * ✅ SEARCH Movies by title
 */
export async function searchMoviesByTitle(query: string): Promise<Movie[]> {
  try {
    const url = `${MOVIES_URL}/search/all?title=${encodeURIComponent(query)}`;
    const response = await fetch(url);

    const text = await response.text();
    if (!text.trim()) return [];

    const data = JSON.parse(text);
    return Array.isArray(data) ? data : data.content || [];

  } catch (error) {
    console.error("Error searching movies:", error);
    return [];
  }
}
