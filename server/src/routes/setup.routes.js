import {
    createSetup,
    getSetups,
    getSetup,
} from "../controllers/setup.controller.js";
import express, { Router } from "express";
import { requireAuth } from "@clerk/express";
const router = Router();

router.use(express.json({ limit: "16kb" }));
router.use(requireAuth());

router.route("/").post(createSetup).get(getSetups);
router.route("/:id").get(getSetup);

export default router;
