import mongoose from "mongoose";

const replySchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },

    label: {
      type: String,
      default: null,
    },

    confidence: {
      type: Number,
      default: 0,
    },

    isFlagged: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: ["visible", "flagged"],
      default: "visible",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Reply", replySchema);