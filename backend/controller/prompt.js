import { Prompt } from "../models/promptSchema.js";
import { User } from "../models/userSchema.js";
import { Engineer } from "../models/engineerSchema.js";
import ErrorHandler from "../middlewares/error.js";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import cloudinary from "cloudinary";

/**
 * Controller function to create a new Prompt
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {function} next - The next middleware function
 * @returns {Promise<void>} - Promise representing the operation completion
 */
export const createPrompt = catchAsyncError(async (req, res, next) => {
  const { role } = req.user;
  if (role === "admin") {
    return next(new ErrorHandler("You are not allowed to sell prompts", 400));
  }

  const {
    title,
    description,
    type,
    category,
    price,
    prompt,
    engine,
    tipsToUse,
  } = req.body;
  if (
    !title ||
    !description ||
    !type ||
    !category ||
    !price ||
    !prompt ||
    !engine
  ) {
    return next(new ErrorHandler("Please provide all required fields", 400));
  }
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Please upload images", 400));
  }
  const { cover_image } = req.files;
  const allowedFormats = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
  if (!allowedFormats.includes(cover_image.mimetype)) {
    return next(new ErrorHandler("Please upload a valid cover image", 400));
  }
  const cloudinaryResponse = await cloudinary.uploader.upload(
    cover_image.tempFilePath,
    {
      folder: "prompt/cover_image",
      // width: 150,
      // crop: "scale",
    }
  );
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.log(
      "Cloudinary Error: ",
      cloudinaryResponse.error || "Unknown Error"
    );
    return next(new ErrorHandler("Prompt cover image upload failed", 500));
  }
  const uploadedBy = req.user._id;
  const newPrompt = await Prompt.create({
    title,
    description,
    type,
    category,
    price,
    prompt,
    engine,
    tipsToUse,
    cover_image: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
    uploadedBy,
  });
  // add this prompt as the user's sold prompt
  // const user = await User.findById(uploadedBy);
  // user.soldPrompts.push(newPrompt);
  // await user.save();

  res.status(201).json({
    success: true,
    message: "Prompt created successfully",
    newPrompt,
  });
});

/**
 * Controller function to get all prompts based on query parameters
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {function} next - The next middleware function
 * @returns {Promise<void>} - Promise representing the operation completion
 */
export const getAllPrompts = catchAsyncError(async (req, res, next) => {
  // Destructuring query parameters with default values
  const {
    search = "",
    type = "All",
    engine = "All",
    category = "All",
    sort = "Newest", // Default sort by top or newest prompt
    priceRange = "All",
  } = req.query;

  // Build the Mongoose query based on the provided parameters
  const query = {};
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
      // Add more fields for search as needed
    ];
  }
  if (type !== "All") {
    query.type = type;
  }
  if (engine !== "All") {
    query.engine = engine;
  }
  if (category !== "All") {
    // Assuming 'category' is a field in your schema
    query.category = category;
  }
  if (priceRange !== "All") {
    // Assuming 'price' is a field in your schema
    const [minPrice, maxPrice] = priceRange.split("-");
    query.price = { $gte: minPrice, $lte: maxPrice };
  }
  let sortField;
  if (sort === "Top") {
    sortField = "-createdAt"; // Sort by top prompts, modify as needed
  } else if (sort === "Newest") {
    sortField = "-createdAt"; // Sort by newest prompts
  } else if (sort === "Oldest") {
    sortField = "createdAt"; // Sort by oldest prompts
  }
  // Use the query to retrieve prompts
  const prompts = await Prompt.find(query).sort(sortField);
  res.status(200).json({
    success: true,
    prompts,
  });
});

/**
 * Controller function to get prompts uploaded by the current user
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {function} next - The next middleware function
 * @returns {Promise<void>} - Promise representing the operation completion
 */
export const getMyPrompts = catchAsyncError(async (req, res, next) => {
  const prompts = await Prompt.find({ uploadedBy: req.user._id });
  res.status(200).json({
    success: true,
    prompts,
  });
});

export const getBoughtPrompts = catchAsyncError(async (req, res, next) => {  
  const user = await User.findById(req.user._id);
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }
  
  // Fetch prompts bought by the user
  const prompts = await Prompt.find({ _id: { $in: user.boughtPrompts } });

  res.status(200).json({
    success: true,
    prompts,
  });
});

export const getEngineerPrompts = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const engineer = await Engineer.findOne({ user: id });
  if (!engineer) return next(new ErrorHandler("Engineer not found", 404));
  // Fetch prompts sold by the engineer
  const prompts = await Prompt.find({ _id: { $in: engineer.soldPrompts } });
  res.status(200).json({
    success: true,
    data: prompts,
  });
});

/**
 * Controller function to update a prompt
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {function} next - The next middleware function
 * @returns {Promise<void>} - Promise representing the operation completion
 */
export const updatePrompt = catchAsyncError(async (req, res, next) => {
  const { role } = req.user;
  if (role === "admin") {
    return next(new ErrorHandler("You are not allowed to sell prompts", 400));
  }
  const { id } = req.params;
  let prompt = await Prompt.findById(id);
  if (!prompt) {
    return next(new ErrorHandler("Oops! Prompt not found", 404));
  }
  if (prompt.uploadedBy.toString() !== req.user._id.toString()) {
    return next(
      new ErrorHandler("You are not authorized to update this prompt", 401)
    );
  }
  prompt = await Prompt.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    message: "Prompt updated successfully",
    prompt,
  });
});

/**
 * Controller function to delete a prompt
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {function} next - The next middleware function
 * @returns {Promise<void>} - Promise representing the operation completion
 */
export const deletePrompt = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  let prompt = await Prompt.findById(id);
  if (!prompt) {
    return next(new ErrorHandler("Oops! Prompt not found", 404));
  }
  if (prompt.uploadedBy.toString() !== req.user._id.toString()) {
    return next(
      new ErrorHandler("You are not authorized to delete this prompt", 401)
    );
  }
  await prompt.deleteOne();
  res.status(200).json({
    success: true,
    message: "Prompt deleted successfully",
  });
});

/**
 * Controller function to get a prompt by its ID
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {function} next - The next middleware function
 * @returns {Promise<void>} - Promise representing the operation completion
 */
export const getPromptById = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const prompt = await Prompt.findById(id);
  if (!prompt) {
    return next(new ErrorHandler("Oops! Prompt not found", 404));
  }
  res.status(200).json({
    success: true,
    prompt,
  });
});

export const likePrompt = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const prompt = await Prompt.findById(id);
  if (!prompt) {
    return next(new ErrorHandler("Oops! Prompt not found", 404));
  }

  const userId = req.user._id;

  // Check if the user has already liked the prompt
  if (prompt.likes.some((like) => like.equals(userId))) {
    return next(new ErrorHandler("You have already liked this prompt", 400));
  }

  // Add the user's id to the likes array
  prompt.likes.push(userId);

  // Update the likes count
  prompt.likesCount = prompt.likes.length;

  // Save the updated prompt
  await prompt.save();

  res.status(200).json({
    success: true,
    message: "Prompt liked successfully------------",
  });
});
