import { createPrompt, deletePrompt, getAllPrompts, getMyPrompts, getPromptById, updatePrompt,likePrompt,getEngineerPrompts,getBoughtPrompts } from "../controller/prompt.js";
import express from "express";
import { isAuthorized } from "../middlewares/auth.js";

const router = express.Router();


router.get("/my-prompts", isAuthorized, getMyPrompts);
router.get("/bought-prompts", isAuthorized, getBoughtPrompts);
router.put("/update/:id", isAuthorized, updatePrompt);
router.delete("/delete/:id", isAuthorized, deletePrompt);
router.post("/like/:id",isAuthorized,likePrompt);
router.post("/create", isAuthorized, createPrompt);
router.get("/all-prompts", getAllPrompts);
router.get("/:id", getPromptById);
router.get("/engineer/:id", getEngineerPrompts);

export default router;