import getSimilarService from "../services/similar.js";
import type { RequestHandler } from "express";

type Params = {
  tmdbId: string | undefined;
};

const getSimilarHandler: RequestHandler<Params, {}, {}, {}> = async (
  req,
  res,
) => {
  const tmdbId = req.params.tmdbId;
  if (!tmdbId) {
    res.status(400).send("Missing ID");
    return;
  }
  console.log(`Generating recommendations for ${tmdbId}`);
  try {
    const similarResult = await getSimilarService(tmdbId);
    if (similarResult.success) {
      console.log("Similar response:", similarResult.data);
      res.json(similarResult.data);
    } else {
      console.error("Error getting similar movies", similarResult.error);
      res.status(500).send(`Error getting similar movies for ID "${tmdbId}"`);
    }
  } catch (err) {
    res.status(500).send(`Error getting similar movies for ID "${tmdbId}"`);
  }
};

export default getSimilarHandler;
