import http from "http";
import express from "express";
import { Server } from "socket.io";

const server = http.createServer();
const app = express();
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

import Connections from "./component/connections.js";

const connections = new Connections();

app.use(express.static("live"));
app.listen(3002);

io.on("connection", (socket) => {
  socket.on("registerClient", (clientId) => {
    if (clientId == null) return;
    try {
      const client = connections.newConection({ socket });

      socket.emit("connectInfo", {
        clientId: client.getClientId(),
        creator: client.isCreator(),
      });
      console.log(`clientConnect: ${clientId}`);
    } catch (error) {
      console.log(`clientConnect ERROR: ${clientId} ${error}`);
    }
  });

  socket.on("setUsername", (username) => {
    connections.getConnection(socket.id)?.setUsername(username);
    socket.emit("userData", {
      username: connections.getConnection(socket.id).getUsername(),
      creator: connections.getConnection(socket.id).isCreator(),
    });
    socket.emit("userList", connections.getUsers());
    socket.emit("filesContent", connections.getFilesContent());
  });

  socket.on("disconnect", () => connections.deleteConnection(socket.id));
});

setInterval(() => {
  const creator = connections.getCreator();

  if (creator == null) return;
  const files = creator.checkUpdateFiles();
  if (!Object.keys(files).length) return;

  const formatter = {};
  Object.keys(files).forEach((file) => {
    const fileName = file.split("/").at(-1);
    formatter[fileName] = files[file];
  });
  io.emit("fileContent", formatter);
}, 1000);
server.listen(3001);
