import express from "express";
import cors from "cors";
import routes from "./routes.js";
import "dotenv/config";

const app = express();
const port = 4000;

// Adds headers: Access-Control-Allow-Origin: *
app.use(cors());

app.listen(port, () => {
  console.log("App listening on port", port);
  routes(app);
});
