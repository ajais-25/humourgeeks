import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { clerkMiddleware } from "@clerk/express";

const app = express();
app.use(clerkMiddleware());

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
);

// app.use(express.json({ limit: "16kb" })); // might have to change this later
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// routes import
import userRouter from "./routes/user.routes.js";
import tagRouter from "./routes/tag.routes.js";
import setupRouter from "./routes/setup.routes.js";
import punchlineRouter from "./routes/punchline.routes.js";
import webhookRouter from "./routes/webhook.routes.js";

// routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tags", tagRouter);
app.use("/api/v1/setups", setupRouter);
app.use("/api/v1/punchline", punchlineRouter);
app.use("/api/v1/webhook", webhookRouter);

export { app };
