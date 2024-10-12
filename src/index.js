import http from "http";
import express from "express";
import { Server } from "socket.io";

// html render

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

app.use(ifRouter);

app.listen(3002);
const initHandler = new InitHandler({ io });
initHandler.init();

server.listen(3001);
