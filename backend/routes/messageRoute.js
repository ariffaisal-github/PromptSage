import express from "express";
import { isAuthorized } from "../middlewares/auth.js";

import { sendMessage, getMessages } from "../controller/message.js";

const router = express.Router();

router.post("/send/:id", isAuthorized, sendMessage);
router.get("/:id", isAuthorized, getMessages);

export default router;
