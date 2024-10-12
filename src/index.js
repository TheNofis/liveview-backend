import http from "http";
import express from "express";
import { Server } from "socket.io";

// html render
import mustacheExpress from "mustache-express";

const server = http.createServer();
const app = express();

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// handler
import InitHandler from "./socket/handler/initHandler.js";

// router
import ifRouter from "./router/iframeRouter.js";

app.set("views", "./live/");
app.set("view engine", "html");
app.engine("html", mustacheExpress());

app.use(ifRouter);

app.listen(3002);
const initHandler = new InitHandler({ io });
initHandler.init();

server.listen(3001);

// io.on("connection", (socket) => {
//   socket.on("registerClient", (clientId) => {
//     if (clientId == null) return;
//     try {
//       const client = connections.newConection({ socket });
//
//       socket.emit("connectInfo", {
//         clientId: client.getClientId(),
//         creator: client.isCreator(),
//       });
//       console.log(`clientConnect: ${clientId}`);
//     } catch (error) {
//       console.log(`clientConnect ERROR: ${clientId} ${error}`);
//     }
//   });
//
//   socket.on("setUsername", (username) => {
//     connections.getConnection(socket.id)?.setUsername(username);
//     socket.emit("userData", {
//       username: connections.getConnection(socket.id).getUsername(),
//       creator: connections.getConnection(socket.id).isCreator(),
//     });
//     io.emit("userList", connections.getUsers());
//     socket.emit("filesContent", getFilesNames(connections.getFilesContent()));
//   });
//
//   socket.on("disconnect", () => {
//     connections.deleteConnection(socket.id);
//     io.emit("userList", connections.getUsers());
//   });
// });
//
//
