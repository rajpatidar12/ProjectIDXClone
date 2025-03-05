import express from "express";
import cors from "cors";
import apiRouter from "./routes/index.js";
import { PORT } from "./config/serverConfig.js";
import { Server } from "socket.io";
import { createServer } from "node:http";
import chokidar from "chokidar";
import { handleEditorSocketEvents } from "./socketHandlers/editorHandler.js";
import { handleContainerCreate } from "./containers/handleContainerCreate.js";
import { WebSocketServer } from "ws";
import { handleTerminalCreation } from "./containers/handleTerminalCreation.js";
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

const editorNamespace = io.of("/editor");

editorNamespace.on("connection", (socket) => {
  console.log("editor connected");

  let projectId = socket.handshake.query["projectId"];
  console.log("projectId received after backend", projectId);

  if (projectId) {
    var watcher = chokidar.watch(`./projects/${projectId}`, {
      ignored: (path) => path.includes("node_modules"),
      persistent: true,
      awaitWriteFinish: {
        stabilityThreshold: 2000,
        ignoreInitial: true,
      },
    });

    watcher.on("all", (event, path) => {
      // console.log(event, path);
    });
  }

  socket.on("getPort", () => {
    console.log("getPort event received");
  });

  handleEditorSocketEvents(socket, editorNamespace);
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const webSocketForTerminal = new WebSocketServer({
  noServer: true,
});

server.on("upgrade", (req, tcp, head) => {
  const isTerminal = req.url.includes("/terminal");
  if (isTerminal) {
    console.log("req url received", req.url);
    const projectId = req.url.split("=")[1];
    console.log("projectId received after connection", projectId);

    handleContainerCreate(projectId, webSocketForTerminal, req, tcp, head);
  }
});
webSocketForTerminal.on("connection", (ws, req, container) => {
  // console.log("terminal connected", ws, req, container);
  handleTerminalCreation(container, ws);

  ws.on("close", () => {
    container.remove({ force: true }, (err, data) => {
      if (err) {
        console.log("Error while removing the container", err);
      }
      console.log("Container removed successfully", data);
    });
  });
});
