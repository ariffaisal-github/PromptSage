import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { Conversation } from "../models/conversationSchema.js";
import { Message } from "../models/messageSchema.js";

export const sendMessage = catchAsyncError(async (req, res, next) => {
  const { id: receiverId } = req.params;
  const { message } = req.body;
  const senderId = req.user._id;
  let conversation = await Conversation.findOne({
    participants: { $all: [senderId, receiverId] },
  });
  if (!conversation) {
    conversation = await Conversation.create({
      participants: [senderId, receiverId],
      // messages: [], by default
    });
  }
  const newMessage = new Message({
    senderId,
    receiverId,
    message,
  });
  if (newMessage) {
    conversation.messages.push(newMessage._id);
  }
  await Promise.all([conversation.save(), newMessage.save()]);
  res.status(201).json(newMessage);
});

export const getMessages = catchAsyncError(async (req, res, next) => {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;
    const conversation = await Conversation.findOne({
        participants: { $all: [senderId, userToChatId] },
    }).populate("messages");
    if (!conversation) {
        return res.status(200).json([]);
    }
    res.status(200).json(conversation.messages);
});
