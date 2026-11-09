import type { GeneratedMovie } from "../types.js";
import request from "./http.js";
import "dotenv/config";

const geminiApiKey = process.env.GEMINI_API_KEY;
const model = "gemini-3.5-flash-lite";
// If rate limit hit, switch to:
// const model = "gemini-3.1-flash-lite";

const options = {
  host: "generativelanguage.googleapis.com",
  port: 443,
  path: `/v1beta/interactions`,
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Api-Revision": "2026-05-20",
    "x-goog-api-key": geminiApiKey,
  },
};

async function generateSimilarMovieJson(movieMeta: {
  title: string;
  release_date: string;
  overview: string;
}): Promise<GeneratedMovie[]> {
  const body = {
    model: model,
    input: `You are a film recommendation expert with deep knowledge of cinema across genres, eras, and countries.

A user has told me about a movie they enjoy. Based on it, recommend 10 similar movies they are likely to love.

MOVIE THE USER LIKES
Title: ${movieMeta.title}
Date: ${movieMeta.release_date}
Synopsis: ${movieMeta.overview}

HOW TO CHOOSE RECOMMENDATIONS
1. Look beyond genre. Consider tone, themes, pacing, narrative structure, visual style, character dynamics, and emotional impact.
2. Include a mix: a few obvious, well-known matches, and a few lesser-known or international picks the user may not have discovered.
3. Draw from different decades, not just films released near the year above.
4. Do not include the original movie, its sequels, or its remakes.
5. Only recommend real movies. If you are unsure that a title, year, or detail is accurate, leave it out and choose another film.

OUTPUT FORMAT
Return an ordered list of 10 movies. For each one, include the following: 
  - Title
  - Year
  - Why you'll like it: 3-4 sentences connecting it specifically to the movie the user provided (shared themes, tone, plot elements, or style).
  - Genre(s): [genres]`,

    response_format: {
      type: "text",
      mime_type: "application/json",
      schema: {
        type: "array",
        items: {
          type: "object",
          properties: {
            title: { type: "string", description: "The movie's title." },
            year: {
              type: "number",
              description: "The movie's relase year.",
            },
            reason: {
              type: "string",
              description:
                "Why you'll like it: 1-2 sentences connecting it specifically to the movie the user provided (shared themes, tone, plot elements, or style)",
            },
            genres: {
              type: "array",
              items: { type: "string" },
              description: "Three of the movie's most relevant genres.",
            },
          },
          required: ["title", "year", "reason", "genres"],
        },
      },
    },
  };

  const { statusCode, response } = await request(options, JSON.stringify(body));
  if (statusCode == 200) {
    const result = JSON.parse(
      response.steps[1].content[0].text,
    ) as GeneratedMovie[];
    return result;
  } else {
    console.log(response);
    throw new Error(
      `Error generating recommendations (status is not 200): ${statusCode} ${response.error.code}`,
    );
  }
}

export default generateSimilarMovieJson;
