import {
    addPunch,
    getPunchlines,
} from "../controllers/punchline.controller.js";
import { requireAuth } from "@clerk/express";
import express, { Router } from "express";
const router = Router();

router.use(express.json({ limit: "16kb" }));
router.use(requireAuth());

router.route("/:setupId").get(getPunchlines).patch(addPunch);

export default router;
