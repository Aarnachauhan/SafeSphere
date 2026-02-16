import express from "express";
import {
  createUser,
  getUserByUsername,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/", createUser);
router.get("/:username", getUserByUsername);

export default router;