import { payPrompt } from "../controller/payment.js";
import express from "express";
import { isAuthorized } from "../middlewares/auth.js";

const router = express.Router();

router.post("/:id",  payPrompt);

export default router;