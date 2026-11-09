import searchTmdbService from "../services/search.js";
import type { RequestHandler } from "express";

interface SearchQueryTypes {
  query: string | undefined;
}

const searchTmdbHandler: RequestHandler<{}, {}, {}, SearchQueryTypes> = async (
  req,
  res,
) => {
  const query = req.query.query;
  if (!query) {
    res.status(400).send("Missing query");
    return;
  }
  console.log(`Searching for ${query}`);
  try {
    const searchResult = await searchTmdbService(query);
    console.log("Search response:", searchResult);
    if (searchResult.statusCode == 200) {
      res.json(searchResult.response.results);
    } else {
      res.status(500).send(`Upstream error performing search for ${query}`);
    }
  } catch (err) {
    res.status(500).send(`Internal error performing search for ${query}`);
  }
};

export default searchTmdbHandler;
