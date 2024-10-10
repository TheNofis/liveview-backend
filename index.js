import http from "http";
import { Server } from "socket.io";

const server = http.createServer();
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

import Client from "./component/client.js";
import Connections from "./component/connections.js";

import { promises } from "fs";

const connections = new Connections();

io.on("connection", (socket) => {
  socket.on("clientConnect", (clientId) => {
    if (clientId == null) return;

    connections.newConection(
      new Client({
        socket,
        clientId,
        admin: connections.length ? false : true,
      }),
    );
    connections.getConnection(clientId).createRootDir("./live");

    console.log(`clientConnect: ${clientId}`);
  });

  socket.on("startLiveServer", (clientId) => {
    if (clientId == null) return;

    const data = connections[clientId].checkUpdateFiles();

    console.log(data);
    if (!Object.keys(data).length) return;
    console.log("send data");

    socket.emit("fileContent", data);
  });
  socket.on("disconnect", () => {
    promises
      .rmdir(`./live/${socket.id}`)
      .then(() => console.log(`clientDisconnect: ${socket.id}`))
      .catch((err) => console.log(`Error disconnect: ${socket.id} ${err}`));
  });
});
server.listen(3001);
