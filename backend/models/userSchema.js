import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please Enter Your Username!"],
      minLength: [4, "Your Username Must Be Longer Than 4 Characters!"],
      maxLength: [20, "Your Username Cannot Exceed 20 Characters!"],
    },
    email: {
      type: String,
      required: [true, "Please Enter Your Email!"],
      unique: true,
      validate: [validator.isEmail, "Please Enter Valid Email Address!"],
    },
    password: {
      type: String,
      required: [true, "Please Enter Your Password!"],
      select: false,
    },
    // avatar: {
    //   public_id: {
    //     type: String,
    //     required: true,
    //   },
    //   url: {
    //     type: String,
    //     required: true,
    //   },
    //   required: false,
    // },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },
    boughtPrompts: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Prompt",
      },
    ],
    soldPrompts: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Prompt",
      },
    ],
  },
  // createdAt and updatedAt fields
  { timestamps: true }
);

// Encrypting Password Before Saving User
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// Comparing password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Return JWT Token
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

export const User = mongoose.model("User", userSchema);
