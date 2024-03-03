import express from "express";
import { createDiscussion, getDiscussions } from "../controller/discussion.js";

const router = express.Router();

router.post("/create", createDiscussion);
router.get("/all", getDiscussions);

export default router;
