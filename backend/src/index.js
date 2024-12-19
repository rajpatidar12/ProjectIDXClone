import express from "express";
import cors from "cors";
import apiRouter from "./routes/index.js";
import { PORT } from "./Config/serverConfig.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.use("/api", apiRouter);
app.get("/ping", (req, res) => {
  res.send("pong");
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
