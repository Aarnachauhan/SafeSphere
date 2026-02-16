import express from "express";
import {
  createReply,
  getRepliesByPost,
  getFlaggedReplies,
  deleteReply
} from "../controllers/replyController.js";

const router = express.Router();

router.get("/flagged", getFlaggedReplies);
router.get("/:postId", getRepliesByPost);
router.post("/", createReply);
router.delete("/:id", deleteReply);

export default router;