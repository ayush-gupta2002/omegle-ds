import { Socket } from "socket.io";
import http from "http";
const express = require("express");
import { Server } from "socket.io";
import { UserManager } from "./managers/UserManager";

const app = express();
const server = http.createServer(http);
import "dotenv/config";

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const userManager = new UserManager();

io.on("connection", (socket: Socket) => {
  console.log("a user connected");
  userManager.addUser("randomName", socket);
  socket.on("disconnect", () => {
    userManager.removeUser(socket.id);
  });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log("server running at http://localhost:3000");
});
