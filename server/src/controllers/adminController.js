import Reply from "../models/Reply.js";
import User from "../models/User.js";

export const hideReply = async (req, res) => {
  try {
    const reply = await Reply.findByIdAndUpdate(
      req.params.id,
      {
        status: "hidden",
        isFlagged: false,
      },
      { new: true }
    );

    res.json({ message: "Reply hidden successfully", reply });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const allowReply = async (req, res) => {
  try {
    const reply = await Reply.findByIdAndUpdate(
      req.params.id,
      {
        status: "visible",
        isFlagged: false,
      },
      { new: true }
    );

    res.json({ message: "Reply allowed successfully", reply });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const blockUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isBlocked: true },
      { new: true }
    );

    await Reply.updateMany(
      { author: req.params.id },
      { status: "hidden", isFlagged: false }
    );

    res.json({ message: "User blocked successfully", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}