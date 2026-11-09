// Movie object with data from TMDB only
export interface TmdbMovie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
}

// Movie recommended by the backend. Includes reason and genres
export interface RecommendedMovie extends TmdbMovie {
  reason: string;
  genres: string[];
}
