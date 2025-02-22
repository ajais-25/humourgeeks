import { getUserHistory } from "../controllers/user.controller.js";
import express, { Router } from "express";
import { requireAuth } from "@clerk/express";
const router = Router();

router.use(express.json({ limit: "16kb" }));
router.route("/history").get(requireAuth(), getUserHistory);

export default router;
