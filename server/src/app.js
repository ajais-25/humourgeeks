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

// routes declaration

export { app };
