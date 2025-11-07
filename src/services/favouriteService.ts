import { FAVOURITES_URL} from "@/lib/config";

/**
 * ✅ ADD Favourite
 */
export async function addToFavourites(userId: string, movieId: string) {
  const token = localStorage.getItem("jwt");

  if (!token) return "You must login first";

  const res = await fetch(
    `${FAVOURITES_URL}/add?userId=${userId}&movieId=${movieId}`,
    {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    }
  );

  const raw = await res.text();
  console.log("RAW addFavourite response:", raw);

  const result = Number(raw);

  switch (result) {
    case 0: return "Added to favourites";
    case 1: return "User not found";
    case 2: return "Movie not found";
    case 3: return "Already in favourites";
    default: return "Unknown response";
  }
}

/**
 * ✅ REMOVE Favourite
 */
export async function removeFavourite(userId: string, movieId: string): Promise<string> {
  const token = localStorage.getItem("jwt");
  if (!token) return "You must login first";

  const res = await fetch(
    `${FAVOURITES_URL}/remove?userId=${userId}&movieId=${movieId}`,
    {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    }
  );

  const raw = await res.text();
  console.log("RAW removeFavourite response:", raw);

  const result = Number(raw);

  switch (result) {
    case 0: return "Removed from favourites";
    case 1: return "User not found";
    case 2: return "Movie not in favourites";
    default: return "Unknown response";
  }
}

/**
 * ✅ GET Favourites
 */
export async function getFavourites(userId: string) {
  const token = localStorage.getItem("jwt");
  if (!token) return null;

  const res = await fetch(
    `${FAVOURITES_URL}/list?userId=${userId}`,
    {
      headers: { "Authorization": `Bearer ${token}` },
    }
  );

  if (res.status === 404) return null;

  return await res.json(); // array of movies
}
