import {
    createTag,
    getTags,
    deleteTag,
} from "../controllers/tag.controller.js";
import express, { Router } from "express";
import { requireAuth } from "@clerk/express";
const router = Router();

router.use(express.json({ limit: "16kb" }));
router.use(requireAuth());

router.route("/").get(getTags).post(createTag);

router.route("/:id").delete(deleteTag);

export default router;
