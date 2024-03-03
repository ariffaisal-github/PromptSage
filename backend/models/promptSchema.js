import mongoose from "mongoose";
import validator from "validator";

//  If you want to handle file uploads in your application, you might want to look into using a file upload library or middleware to manage file storage and retrieval. Popular choices include multer for Express.js applications.

const promptSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please Enter Prompt Name!"],
    minLength: [6, "Prompt Title Must Be Longer Than 6 Characters!"],
    maxLength: [40, "Prompt Title Cannot Exceed 40 Characters!"],
  },
  description: {
    type: String,
    required: [true, "Please Enter Prompt Description!"],
    minLength: [6, "Prompt Description Must Be Longer Than 20 Characters!"],
    maxLength: [700, "Prompt Description Cannot Exceed 3000 Characters!"],
  },
  type: {
    type: String,
    required: [true, "Please Enter Prompt Type!"],
  },
  category: {
    type: String,
    required: [true, "Please Enter Prompt Category!"],
  },
  price: {
    type: Number,
    required: [true, "Please Enter Prompt Price!"],
    default: 0.0,
  },
  prompt: {
    type: String,
    required: [true, "Please Enter Your Prompt!"],
    minLength: [6, "Prompt Must Be Longer Than 10 Characters!"],
    maxLength: [5000, "Prompt Cannot Exceed 5000 Characters!"],
  },
  engine: {
    type: String,
    required: [true, "Please Select Engine!"],
  },
  tipsToUse: {
    type: String,
    required: false,
    minLength: [6, "Tips To Use Must Be Longer Than 20 Characters!"],
    maxLength: [1000, "Tips To Use Cannot Exceed 500 Characters!"],
  },
  cover_image: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  likes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
  }],

  likesCount: {
    type: Number,
    default: 0
  },
  // sample_images: [
  //   {
  //     public_id: {
  //       type: String,
  //       required: false,
  //     },
  //     url: {
  //       type: String,
  //       required: false,
  //     },
  //   },
  // ],
  // created by a user (username)
  uploadedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Please provide the user who uploaded this prompt!"],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  // review: [
  //   {
  //     type: mongoose.Schema.ObjectId,
  //     ref: "Review",
  //     required: false,
  //   },
  // ],
});

export const Prompt = mongoose.model("Prompt", promptSchema);
