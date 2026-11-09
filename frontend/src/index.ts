import getData from "./utils/getData.js";
import type { TmdbMovie } from "./types.js";
import createMovieElment from "./utils/movieElement.js";

async function searchTmdb(query: string): Promise<TmdbMovie[]> {
  if (query && query.length > 2) {
    console.log("");
    const encodedQuery = encodeURIComponent(query);
    return await getData<TmdbMovie[]>(`/api/movies?query=${encodedQuery}`);
  } else {
    return [];
  }
}

const addMovieButton = document.getElementById(
  "add-movie-box",
) as HTMLButtonElement;
const addMovieModal = document.getElementById(
  "add-movie-modal",
) as HTMLDivElement;
const chosenMovieDiv = document.getElementById(
  "chosen-movie",
) as HTMLDivElement;
const generateButton = document.getElementById(
  "generate-button",
) as HTMLButtonElement;

const movieSearchBar = document.getElementById(
  "movie-search-bar",
) as HTMLInputElement;
const resultList = document.getElementById("search-results") as HTMLDivElement;

let isMoviePicked = false;
let pickedMovieMeta: TmdbMovie;
function openMoviePicker() {
  // Reset search bar and result list first
  movieSearchBar.value = "";
  resultList.replaceChildren();

  isMoviePicked = false;
  addMovieModal.style.visibility = "visible";
  movieSearchBar.focus();
}
addMovieButton.addEventListener("click", openMoviePicker);

function pickMovie(movieElement: HTMLDivElement) {
  isMoviePicked = true;
  addMovieButton.style.display = "none";
  generateButton.disabled = false;
  chosenMovieDiv.replaceChildren(movieElement);
  chosenMovieDiv.style.display = "inline-block";
  addMovieModal.style.visibility = "hidden";
}

movieSearchBar.addEventListener("input", async () => {
  const results = await searchTmdb(movieSearchBar.value);
  const resultElements: HTMLDivElement[] = [];
  for (const movie of results) {
    const baseDiv = createMovieElment(movie);

    baseDiv.addEventListener("click", () => {
      if (!isMoviePicked) {
        pickMovie(baseDiv);
        pickedMovieMeta = movie;
      } else {
        openMoviePicker();
      }
    });
    resultElements.push(baseDiv);
  }
  resultList.replaceChildren(...resultElements);
});

generateButton.addEventListener("click", () => {
  if (isMoviePicked) {
    window.location.href = `/frontend/result.html?movie=${encodeURIComponent(JSON.stringify(pickedMovieMeta))}`;
  }
});
