
import * as dotenv from "dotenv";
dotenv.config();

import "express-async-errors";

import mongoose from "mongoose";

import express from "express";

import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";
import doctorRouter from "./routes/doctor.js";
import timeSlotRouter from "./routes/timeSlot.js";
import timeBooking from "./routes/booking.js";

import ErrorHandler from "./middlewares/errorHandler.js";
import NotFoundError from "./middlewares/notFound.js";

import { authenticateUser } from "./middlewares/auth.js";

import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";

import cookieParser from "cookie-parser";

import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, "./client/dist")));



app.use(express.json());
app.use(cookieParser());



// routes
app.use("/api/v1/user", authenticateUser, userRouter);
app.use("/api/v1/doctor", doctorRouter);
app.use("/api/v1/timeSlot", timeSlotRouter);
app.use("/api/v1/booking", timeBooking);
app.use("/api/v1", authRouter);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/dist", "index.html"));
});

// error handler`
app.use(NotFoundError);
app.use(ErrorHandler);

const Port = process.env.PORT || 5010;

try {
  await mongoose.connect(process.env.MONGO_URI);
  app.listen(Port, () => {
    console.log(`listening on port ${Port}`);
  });
} catch (error) {
  console.log("error");
}