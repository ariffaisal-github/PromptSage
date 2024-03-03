import { Discussion } from "../models/discussionSchema.js";
import ErrorHandler from "../middlewares/error.js";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";

export const createDiscussion = catchAsyncError(async (req, res, next) => {
    const { topic, description } = req.body;
    if (!topic || !description) {
        return next(new ErrorHandler("Please provide all required fields", 400));
    }
    const newDiscussion = await Discussion.create({
        topic,
        description,
    });
    res.status(201).json({
        success: true,
        data: newDiscussion,
    });
});

export const getDiscussions = catchAsyncError(async (req, res, next) => {
    let discussions;
    if (req.query.topic) {
        discussions = await Discussion.find({ topic: { $regex: new RegExp(req.query.topic, "i") } });
    } else {
        discussions = await Discussion.find();
    }
    res.status(200).json({
        success: true,
        data: discussions,
    });
});
