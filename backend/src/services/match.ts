import type { GeneratedMovie, Movie } from "../types.js";
import searchTmdbService from "./search.js";

async function matchMovieService(
  movieInfo: GeneratedMovie,
): Promise<Movie | undefined> {
  console.log(`Starting search for ${movieInfo.title} (${movieInfo.year})`);
  const searchResults = await searchTmdbService(
    movieInfo.title,
    movieInfo.year,
  );
  if (searchResults.statusCode == 200) {
    const matchedMovie: Movie | undefined = searchResults.response.results[0]; // First search result is best match
    if (matchedMovie) {
      console.log(
        `Matched to ${matchedMovie.title} (${matchedMovie.release_date}) - TMDB:${matchedMovie.id}`,
      );
    } else {
      console.warn(`No matches found!`);
    }
    return matchedMovie;
  } else {
    throw new Error(
      `Error matching movie ${movieInfo.title} (${movieInfo.year}), status code is not 200 ${searchResults.response}`,
    );
  }
}

export default matchMovieService;
