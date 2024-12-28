import express from "express";
import cors from "cors";
import apiRouter from "./routes/index.js";
import { PORT } from "./Config/serverConfig.js";
import { Server } from "socket.io";
import { createServer } from "node:http";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    method: ["GET", "POST"],
  },
});

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

io.on("connection", (socket) => {
  console.log("a user connected");
});
app.use("/api", apiRouter);
app.get("/ping", (req, res) => {
  res.send("pong");
});
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
