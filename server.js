
import express from "express";

import * as dotenv from "dotenv";
dotenv.config();

import notFound from "./middlewares/notFound.js";
import errorHandle from "./middlewares/errorHandler.js";


import productRouter from "./routes/product-route.js";

import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";


const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, "./client/dist")));  

app.use(express.json());


// routes
app.use("/api/v1", productRouter);


app.use("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/dist", "index.html"));
});

// error handling
app.use(notFound);
app.use(errorHandle);

const PORT = 3000;

try {
  app.listen(PORT, () => {
    console.log(`server is listining  on ${PORT}`);
  });
} catch (error) {
  console.log(error);
}
