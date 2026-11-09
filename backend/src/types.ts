export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
}

export interface GeneratedMovie {
  title: string;
  year: number;
  reason: string;
  genres: string[];
}

export interface CombinedMovie extends Movie {
  reason: string;
  genres: string[];
}
