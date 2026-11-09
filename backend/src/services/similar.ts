import type { Movie, GeneratedMovie, CombinedMovie } from "../types.js";
import request from "../utils/http.js";
import generateSimilarMovieJson from "../utils/aiClient.js";
import matchMovieService from "./match.js";

type GetSimilarResult =
  | {
      success: true;
      data: CombinedMovie[];
    }
  | {
      success: false;
      error: unknown;
    };

const tmdbReadToken = process.env.TMDB_READ_TOKEN;
async function getSimilarService(tmdbId: string): Promise<GetSimilarResult> {
  const options = {
    host: "api.themoviedb.org",
    port: 443,
    path: `/3/movie/${tmdbId}`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tmdbReadToken}`,
    },
  };
  try {
    // Get movie details
    const movieDetails = await request(options);
    if (movieDetails.statusCode == 200) {
      // Generate recommendations
      const movieMeta = movieDetails.response;
      try {
        const recommendationJson = await generateSimilarMovieJson({
          title: movieMeta.title,
          release_date: movieMeta.relse_wave,
          overview: movieMeta.overview,
        });

        // Match movies to real TMDB entries
        const combinedMovieList: CombinedMovie[] = [];
        for (const suggestedMovie of recommendationJson) {
          const matchedMovie = await matchMovieService(suggestedMovie);
          if (matchedMovie) {
            combinedMovieList.push({
              id: matchedMovie.id,
              title: matchedMovie.title,
              poster_path: matchedMovie.poster_path,
              overview: matchedMovie.overview,
              release_date: matchedMovie.release_date,
              reason: suggestedMovie.reason,
              genres: suggestedMovie.genres,
            });
          }
        }
        return { success: true, data: combinedMovieList };
      } catch (err) {
        return {
          success: false,
          error: `Error generating recommendations with AI: ${err}`,
        };
      }
    } else {
      return { success: false, error: movieDetails.response };
    }
  } catch (err) {
    return { success: false, error: err };
  }
}

export default getSimilarService;
