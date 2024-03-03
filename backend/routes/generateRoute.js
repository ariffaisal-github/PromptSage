import express from "express";
import { generateImage } from "../controller/generate.js";
import { isAuthorized } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", generateImage);

export default router;