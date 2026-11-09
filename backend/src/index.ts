import express from "express";
import cors from "cors";
import routes from "./routes.js";
import "dotenv/config";

const app = express();

const portEnv = process.env.PORT;
let port: number;
if (portEnv) {
  port = parseInt(portEnv);
  if (isNaN(port)) {
    throw new Error(`Error parsing "PORT" env: '${portEnv}' is not an integer`);
  }
} else {
  throw new Error(`"PORT" env variable must be specificed`);
}

// Adds headers: Access-Control-Allow-Origin: *
app.use(cors());

app.listen(port, () => {
  console.log("App listening on port", port);
  routes(app);
});
