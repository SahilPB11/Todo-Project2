import express, { urlencoded } from "express";
import router from "./routes/route.js";
import taskRoute from "./routes/task.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";

export const app = express();
config({
  path: "./config.env",
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.Frontend_Url],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

//using router
app.use("/user", router);
app.use("/task", taskRoute);

app.use(errorMiddleware);
