import type { RecommendedMovie, TmdbMovie } from "../types.js";

const tmdbPosterBase = "https://image.tmdb.org/t/p/w780";
function createMovieElment(
  movie: RecommendedMovie | TmdbMovie,
): HTMLDivElement {
  const baseDiv = document.createElement("div");
  baseDiv.classList.add("movie-item");

  const posterImg = document.createElement("img");
  posterImg.src = tmdbPosterBase + movie.poster_path;
  baseDiv.appendChild(posterImg);

  const rightDiv = document.createElement("div");
  rightDiv.classList.add("result-right");
  baseDiv.appendChild(rightDiv);

  const title = document.createElement("h3");
  title.textContent = movie.title;
  rightDiv.appendChild(title);
  const year = document.createElement("h4");
  // release_date has format YYYY-MM-DD, only use year
  year.textContent = movie.release_date.slice(0, 4);

  if ("genres" in movie) {
    const yearGenreDiv = document.createElement("div");
    yearGenreDiv.classList.add("year-genre");
    const genres = document.createElement("i");
    genres.textContent = movie.genres.join(" • ");

    yearGenreDiv.appendChild(year);
    yearGenreDiv.appendChild(genres);
    rightDiv.appendChild(yearGenreDiv);
  } else {
    rightDiv.appendChild(year);
  }

  const overview = document.createElement("p");
  overview.innerText = movie.overview;
  rightDiv.appendChild(overview);

  return baseDiv;
}

export default createMovieElment;
