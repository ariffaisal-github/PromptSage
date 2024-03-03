import mongoose from 'mongoose';

const discussionSchema = new mongoose.Schema({
  topic: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

export const Discussion = mongoose.model('Discussion', discussionSchema);
