import type { Express, Request, Response } from "express";
import searchTmdbHandler from "./handlers/search.js";
import getSimilarHandler from "./handlers/similar.js";

function routes(app: Express) {
  app.get("/api/health/", (req, res) => {
    res.status(200).send("OK\n");
  });
  app.get("/api/movies", searchTmdbHandler);
  app.get("/api/movie/:tmdbId/similar", getSimilarHandler);
}

export default routes;
