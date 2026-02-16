import User from "../models/User.js";

// SIGN UP (CREATE USER)
export const createUser = async (req, res) => {
  try {
    let { username } = req.body;

    // normalize username
    username = username.trim().toLowerCase();

    const existing = await User.findOne({ username });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({ username });
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "User creation failed" });
  }
};

// LOGIN (GET USER)
export const getUserByUsername = async (req, res) => {
  try {
    const username = req.params.username.trim().toLowerCase();

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Fetch user failed" });
  }
};