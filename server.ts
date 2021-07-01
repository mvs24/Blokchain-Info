import express, { NextFunction, Request, Response } from "express";
import { config } from "dotenv";
import cors from "cors";
import globalErrorHandler from "./controllers/error";
import blocksRoute from "./routes/blocks";
import HTTPError from "./utils/HTTPError";

config();
const server = express();
server.use(
  cors({
    origin: "*",
  })
);
server.use(express.json());

const handleUncaughtExceptionAndRejections = (err: Error) => {
  console.log(err.name, err);
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  process.exit(1);
};

process.on("uncaughtException", (err: Error) => {
  handleUncaughtExceptionAndRejections(err);
});

const API_ENDPOINT = "/api/v1";

server.use(`${API_ENDPOINT}/blocks`, blocksRoute);

server.use("*", (_req: Request, _res: Response, next: NextFunction) => {
  return next(new HTTPError("This route is not yet defined!", 404));
});

server.use(globalErrorHandler);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server ready at port ${PORT}`);
});

process.on("unhandledRejection", (err: Error) => {
  handleUncaughtExceptionAndRejections(err);
});
