import User from "../models/User.js";

export const register = async (req, res) => {
  try {
    const { username, name } = req.body;

    const existing = await User.findOne({ username });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({ username, name });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: "Signup failed" });
  }
};

export const login = async (req, res) => {
  try {
    const { username } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid username" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Login failed" });
  }
};
