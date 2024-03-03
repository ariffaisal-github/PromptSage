import { User } from "../models/userSchema.js";
import { Prompt } from "../models/promptSchema.js";
import { Engineer } from "../models/engineerSchema.js";
import ErrorHandler from "../middlewares/error.js";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { sendToken } from "../utils/jwtToken.js";
import { Conversation } from "../models/conversationSchema.js";

/**
 * Controller function to create a new user
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {function} next - The next middleware function
 * @returns {Promise<void>} - Promise representing the operation completion
 */
export const createUser = catchAsyncError(async (req, res, next) => {
  const { username, email, password, role } = req.body;
  if (!req.body.username || !req.body.email || !req.body.password) {
    return next(new ErrorHandler("Please provide all required fields", 400));
  }
  try {
    const existingUsersCount = await User.countDocuments();
    const userRole = existingUsersCount === 0 ? "admin" : role || "user";
    const newUser = await User.create({
      username,
      email,
      password,
      role: userRole,
    });
    sendToken(newUser, 201, res, "User Registered successfully");
    // console.log(newUser._id);
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(
        (value) => value.message
      );
      return next(new ErrorHandler(messages.join(", "), 400));
    }
    return next(error);
  }
});

/**
 * Controller function to authenticate user login
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {function} next - The next middleware function
 * @returns {Promise<void>} - Promise representing the operation completion
 */
export const login = catchAsyncError(async (req, res, next) => {
  const { email, password, role } = req.body;
  if (!req.body.email || !req.body.password) {
    return next(new ErrorHandler("Please provide all required fields", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }
  sendToken(user, 200, res, "Login Successful");
});

/**
 * Controller function to log out a user
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {function} next - The next middleware function
 * @returns {void}
 */
export const logout = catchAsyncError(async (req, res, next) => {
  res
    .status(201)
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Logged out",
    });
});

/**
 * Controller function to get current user details
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {function} next - The next middleware function
 * @returns {Promise<void>} - Promise representing the operation completion
 */
export const currentUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  res.status(200).json({
    success: true,
    user,
  });
});

/**
 * Controller function to add a bought prompt to user's profile
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {function} next - The next middleware function
 * @returns {Promise<void>} - Promise representing the operation completion
 */
export const addBoughtPrompt = catchAsyncError(async (req, res, next) => {
  const { boughtBy, promptId } = req.body;
  const user = await User.findById(boughtBy);
  if (!user) return next(new ErrorHandler("User not found", 404));
  user.boughtPrompts.push(promptId);
  await user.save();

  const prompt = await Prompt.findById(promptId);
  if (!prompt) return next(new ErrorHandler("Prompt not found", 404));
  const uploadedBy = prompt.uploadedBy;

  const user2 = await User.findById(uploadedBy);
  if (!user2) return next(new ErrorHandler("User not found", 404));
  user2.soldPrompts.push(prompt);
  await user2.save();

  // check if user2 is an engineer
  let engineer = await Engineer.findOne({ user: user2._id });
  if (!engineer) {
    engineer = new Engineer({
      user: user2._id,
      username: user2.username,
      email: user2.email,
      soldPrompts: [],
      rank: 0,
    });
  }
  engineer.soldPrompts.push(promptId);
  await engineer.save();

  res.status(201).json({
    success: true,
    message: "Prompt successfully added to user's bought prompts",
  });
});

export const getUser = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

export const getUsersForChatSidebar = catchAsyncError(
  async (req, res, next) => {
    const loggedInUserId = req.user._id;

    // Find conversations where the logged-in user is a participant
    const conversations = await Conversation.find({
      participants: loggedInUserId,
    });

    // Extract user IDs from conversations
    const participantIds = conversations.flatMap(
      (conversation) => conversation.participants
    );

    // Remove duplicates and the logged-in user's ID
    let filteredUserIds = [...new Set(participantIds)];
    filteredUserIds = filteredUserIds.filter(
      (id) => id.toString() !== loggedInUserId.toString()
    );

    // Find users based on filtered IDs
    const filteredUsers = await User.find({ _id: { $in: filteredUserIds } });

    res.status(200).json({
      loggedInUserId: loggedInUserId,
      data: filteredUsers,
    });
  }
);

export const getEngineerById = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) return next(new ErrorHandler("User not found", 404));
  const engineer = await Engineer.findOne({ user: id });
  if (!engineer) return next(new ErrorHandler("Engineer not found", 404));
  res.status(200).json(engineer);
});

export const getAllEngineers = catchAsyncError(async (req, res, next) => {
  const engineers = await Engineer.find();
  if (!engineers) return next(new ErrorHandler("No engineers found", 404));
  res.status(200).json(engineers);
});
