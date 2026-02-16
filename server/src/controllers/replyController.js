import axios from "axios";
import Reply from "../models/Reply.js";

export const createReply = async (req, res) => {
  try {
    const { postId, userId, content } = req.body;

    const mlResponse = await axios.post(
      "http://127.0.0.1:8000/predict",
      { text: content }
    );

    const { label, confidence } = mlResponse.data;

    const isFlagged = label !== "not_cyberbullying";

    const reply = await Reply.create({
      post: postId,
      author: userId,
      content,
      label,
      confidence,
      isFlagged,
      status: isFlagged ? "flagged" : "visible",
    });

    const populatedReply = await reply.populate("author", "username");

    res.status(201).json(populatedReply);

  } catch (error) {
    console.error("Reply creation failed:", error.message);
    res.status(500).json({ message: "Failed to create reply" });
  }
};

export const getRepliesByPost = async (req, res) => {
  try {
    const replies = await Reply.find({
      post: req.params.postId,
      status: "visible",
    })
      .populate("author", "username")
      .sort({ createdAt: 1 });

    res.json(replies);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch replies" });
  }
};

export const getFlaggedReplies = async (req, res) => {
  try {
    const replies = await Reply.find({ isFlagged: true })
      .populate("author", "username")
      .sort({ createdAt: -1 });

    res.json(replies);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch flagged replies" });
  }
};

export const deleteReply = async (req, res) => {
  try {
    await Reply.findByIdAndDelete(req.params.id);
    res.json({ message: "Reply deleted" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
};

export const updateReplyStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const reply = await Reply.findByIdAndUpdate(
      req.params.id,
      { status, isFlagged: status === "flagged" },
      { new: true }
    );

    res.json(reply);
  } catch (error) {
    res.status(500).json({ message: "Update failed" });
  }
};