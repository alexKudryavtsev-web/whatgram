import http from "http";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import config from "config";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { Server as SocketServer } from "socket.io";

import WebSockets from "./utils/WebSockets.js";
import errorMiddleware from "./middleware/error.middleware.js";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import contactRouter from "./routes/contact.routes.js";
import conversationRouter from "./routes/conversation.routes.js";

const CORS_OPTIONS = {
  origin: config.get("CLIENT_URL"),
  methods: ["GET", "POST", "DELETE"],
};
const PORT = config.get("PORT");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(logger("dev"));
app.use(cors(CORS_OPTIONS));

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/contact", contactRouter);
app.use("/api/conversation", conversationRouter);

app.get("/test", (req, res) => res.json("YES"));

// app.use(errorMiddleware);

const server = http.createServer(app);

global.io = new SocketServer(server, {
  cors: CORS_OPTIONS,
});
global.io.on("connection", (socket) => WebSockets.connection(socket));

async function start() {
  try {
    await mongoose.connect(config.get("DB_URI"));

    server.listen(PORT);

    server.on("listening", () => {
      console.log(`Listening on port: http://localhost:${PORT}/`);
    });
  } catch (e) {
    console.log("Server failed");
  }
}

start();
