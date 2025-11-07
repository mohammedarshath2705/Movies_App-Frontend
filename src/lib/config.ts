export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export const MOVIES_URL = `${API_URL}/movies`;
export const FAVOURITES_URL = `${API_URL}/favourites`;

export const AUTH_URL = `${API_URL}/auth`;
export const OAUTH_GOOGLE_URL = `${API_URL}/oauth2/authorization/google`;


