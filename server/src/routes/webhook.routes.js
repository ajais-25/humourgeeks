import { userWebhook } from "../webhooks/clerk.js";
import bodyParser from "body-parser";
import { Router } from "express";
const router = Router();

router
    .route("/clerk")
    .post(bodyParser.raw({ type: "application/json" }), userWebhook);

export default router;
