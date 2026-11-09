import getData from "./utils/getData.js";
import createMovieElment from "./utils/movieElement.js";
import type { RecommendedMovie } from "./types.js";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const movieMeta = urlParams.get("movie");
if (!movieMeta) {
  throw new Error("Missing 'movie' url query string");
}
const parsedMeta = JSON.parse(movieMeta);

const chosenMovieDiv = document.getElementById(
  "chosen-movie",
) as HTMLDivElement;

const resultList = document.getElementById(
  "recommended-movie-list",
) as HTMLDivElement;

const chosenMovieElement = createMovieElment(parsedMeta);
chosenMovieDiv.appendChild(chosenMovieElement);

const response = `[{"id":5548,"title":"RoboCop","poster_path":"/hHtOgGb3NihlyRATHlKPaFApbrd.jpg","overview":"In a violent, near-apocalyptic Detroit, evil corporation Omni Consumer Products wins a contract from the city government to privatize the police force. To test their crime-eradicating cyborgs, the company leads street cop Alex Murphy into an armed confrontation with crime lord Boddicker so they can use his body to support their untested RoboCop prototype. But when RoboCop learns of the company's nefarious plans, he turns on his masters.","release_date":"1987-07-17","reason":"Like Iron Man, this film features a protagonist who undergoes a traumatic transformation and must reconcile his humanity with high-tech weaponry.","genres":["Action","Sci-Fi","Crime"]},{"id":137113,"title":"Edge of Tomorrow","poster_path":"/nBM9MMa2WCwvMG4IJ3eiGUdbPe6.jpg","overview":"Major Bill Cage is an officer who has never seen a day of combat when he is unceremoniously demoted and dropped into combat. Cage is killed within minutes, managing to take an alpha alien down with him. He awakens back at the beginning of the same day and is forced to fight and die again... and again - as physical contact with the alien has thrown him into a time loop.","release_date":"2014-05-27","reason":"This film captures the same fast-paced, high-stakes kinetic energy found in Iron Man's combat scenes, paired with a witty and arrogant lead character.","genres":["Action","Sci-Fi","Adventure"]},{"id":500664,"title":"Upgrade","poster_path":"/woLGROUdPWdBnLVFKYdGD3kFkPY.jpg","overview":"A brutal mugging leaves Grey Trace paralyzed in the hospital and his beloved wife dead. A billionaire inventor soon offers Trace a cure — an artificial intelligence implant called STEM that will enhance his body. Now able to walk, Grey finds that he also has superhuman strength and agility — skills he uses to seek revenge against the thugs who destroyed his life.","release_date":"2018-05-31","reason":"It offers a grittier take on the 'man and machine' bond, exploring the dangerous potential of advanced technology integration similar to Stark's suit.","genres":["Sci-Fi","Action","Thriller"]},{"id":17654,"title":"District 9","poster_path":"/tuGlQkqLxnodDSk6mp5c2wvxUEd.jpg","overview":"Thirty years ago, aliens arrive on Earth. Not to conquer or give aid, but to find refuge from their dying planet. Separated from humans in a South African area called District 9, the aliens are managed by Multi-National United, which is unconcerned with the aliens' welfare but will do anything to master their advanced technology. When a company field agent contracts a mysterious virus that begins to alter his DNA, there is only one place he can hide: District 9.","release_date":"2009-08-05","reason":"The film excels at depicting grounded, realistic 'found-tech' designs that resonate with the industrial, mechanical aesthetic of the Mark I armor.","genres":["Sci-Fi","Action","Thriller"]},{"id":10249,"title":"The Rocketeer","poster_path":"/2tDFRESFwKww1LHRE8W1Exj9edH.jpg","overview":"A stunt pilot comes across a prototype jetpack that gives him the ability to fly. However, evil forces of the world also want this jetpack at any cost.","release_date":"1991-06-21","reason":"This film focuses on a regular person who gains the ability to fly through a sophisticated piece of hardware, capturing that same sense of wonder and invention.","genres":["Action","Adventure","Family"]},{"id":180,"title":"Minority Report","poster_path":"/qtgFcnwh9dAFLocsDk2ySDVS8UF.jpg","overview":"John Anderton is a top 'Precrime' cop in the late-21st century, when technology can predict crimes before they're committed. But Anderton becomes the quarry when another investigator targets him for a murder charge.","release_date":"2002-06-20","reason":"It shares the slick, futuristic technological interface and high-tech investigative thrills that fans of Stark's digital workspace will appreciate.","genres":["Action","Sci-Fi","Mystery"]},{"id":39254,"title":"Real Steel","poster_path":"/4GIeI5K5YdDUkR3mNQBoScpSFEf.jpg","overview":"Charlie Kenton is a washed-up fighter who retired from the ring when robots took over the sport. After his robot is trashed, he reluctantly teams up with his estranged son to rebuild and train an unlikely contender.","release_date":"2011-09-28","reason":"The focus on the technical engineering of giant robots and the mentorship-driven character arc echoes the technical problem-solving found in Stark's garage.","genres":["Action","Drama","Sci-Fi"]},{"id":9323,"title":"Ghost in the Shell","poster_path":"/9gC88zYUBARRSThcG93MvW14sqx.jpg","overview":"In the year 2029, the barriers of our world have been broken down by the net and by cybernetics, but this brings new vulnerability to humans in the form of brain-hacking. When a highly-wanted hacker known as 'The Puppetmaster' begins involving them in politics, Section 9, a group of cybernetically enhanced cops, are called in to investigate and stop the Puppetmaster.","release_date":"1995-11-18","reason":"This anime classic delves deeper into the philosophical consequences of merging biological consciousness with mechanical armor, a mature evolution of the Iron Man theme.","genres":["Animation","Action","Sci-Fi"]},{"id":68726,"title":"Pacific Rim","poster_path":"/mmznhaQDwlHWpUwKuNxtQiubbmM.jpg","overview":"Using massive piloted robots to combat the alien threat, Earth's survivors take the fight to the invading alien force lurking in the depths of the Pacific Ocean. Nearly defenseless in the face of the relentless enemy, the forces of mankind have no choice but to turn to two unlikely heroes who now stand as Earth's final hope against the mounting apocalypse.","release_date":"2013-07-11","reason":"This film doubles down on the visceral joy of operating massive mechanical suits to fight external threats, matching the sheer spectacle of the Iron Man suit in action.","genres":["Action","Sci-Fi","Adventure"]},{"id":157353,"title":"Transcendence","poster_path":"/i3JqPtiJWnidaif3UA2K2Eng0hp.jpg","overview":"Two leading computer scientists work toward their goal of Technological Singularity,  as a radical anti-technology organization fights to prevent them from creating a world where computers can transcend the abilities of the human brain.","release_date":"2014-04-16","reason":"It explores the ego-driven obsession with technological advancement and its global consequences, reflecting Tony Stark's initial hubris and his struggle to control his inventions.","genres":["Sci-Fi","Drama","Thriller"]}]`;

async function populateList() {
  const similarMovieList = await getData<RecommendedMovie[]>(
    `/api/movie/${parsedMeta.id}/similar`,
  );
  // const similarMovieList = JSON.parse(response) as RecommendedMovie[];
  resultList.replaceChildren(); // Clear placeholders
  similarMovieList.forEach((movie, index) => {
    movie.overview = movie.reason;

    const baseDiv = document.createElement("div");
    baseDiv.classList.add("numbered-result");

    const movieIndex = document.createElement("h1");
    movieIndex.textContent = (index + 1).toString(); // Start numbering at 1
    baseDiv.appendChild(movieIndex);

    const movieItem = createMovieElment(movie);
    baseDiv.appendChild(movieItem);

    resultList.appendChild(baseDiv);
  });
}

populateList();
