import {
    postPunch,
    getTopPunches,
    toggleUpvote,
} from "../controllers/topPunches.controller.js";
import { requireAuth } from "@clerk/express";
import express, { Router } from "express";
const router = Router();

router.use(express.json({ limit: "16kb" }));
router.use(requireAuth());

router.route("/:setupId").get(getTopPunches).post(postPunch);
router.route("/:punchId/upvote").patch(toggleUpvote);

export default router;
