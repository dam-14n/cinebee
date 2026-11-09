import request from "../utils/http.js";
import "dotenv/config";

const tmdbReadToken = process.env.TMDB_READ_TOKEN;

function searchTmdbService(
  query: string,
  year?: number,
): ReturnType<typeof request> {
  const queryObject: Record<string, string> = {
    query: query,
  };
  if (year) {
    queryObject.year = String(year);
  }
  const encodedQuery = new URLSearchParams(queryObject);
  const options = {
    host: "api.themoviedb.org",
    port: 443,
    path: `/3/search/movie?${encodedQuery}`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tmdbReadToken}`,
    },
  };
  return request(options);
}

export default searchTmdbService;
