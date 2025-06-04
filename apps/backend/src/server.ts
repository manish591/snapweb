import "dotenv/config";
import express from "express";
import { PORT } from "./constants";

const app = express();

app.listen(PORT, () => {
  console.log("server is listening on port: ", PORT);
});