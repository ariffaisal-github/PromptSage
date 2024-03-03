import { Prompt } from "../models/promptSchema.js";
import { User } from "../models/userSchema.js";
import ErrorHandler from "../middlewares/error.js";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import cloudinary from "cloudinary";
import OpenAI from "openai";


export const generateImage = catchAsyncError(async (req, res, next) => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const { prompt } = req.body;
  const aiResponse = await openai.images.generate({
    prompt: prompt,
  });
  const image = aiResponse.data[0].url;
  // console.log(image);
  res.status(200).json({
    success: true,
    image,
  });
});
