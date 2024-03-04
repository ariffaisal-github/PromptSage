import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { dbConnection } from "./database/dbConnection.js";
import { errorMiddleware } from "./middlewares/error.js";
import userRoute from "./routes/userRoute.js";
import promptRoute from "./routes/promptRoute.js";
import paymentRoute from "./routes/paymentRoute.js";
import generateRoute from "./routes/generateRoute.js";
import messageRoute from "./routes/messageRoute.js";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import discussionRoute from "./routes/discussionRoute.js";

const app = express();
dotenv.config({ path: "./config/config.env" });

app.use(
  cors({
    origin: ["*"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use("/api/v1/users", userRoute);
app.use("/api/v1/prompts", promptRoute);
app.use("/api/v1/payment", paymentRoute);
app.use("/api/v1/generate", generateRoute);
app.use("/api/v1/messages", messageRoute);
app.use("/api/v1/discussions", discussionRoute);

app.get("/", (req, res, next) => {
  return res.status(200).json({
    success: true,
    message: "Welcome to the Prompt Marketplace",
  });
});

dbConnection();

app.use(errorMiddleware);

export default app;
