import express from "express";
import {
  hideReply,
  allowReply,
  blockUser,
} from "../controllers/adminController.js";

const router = express.Router();

/* Reply moderation */
router.patch("/reply/:id/hide", hideReply);
router.patch("/reply/:id/allow", allowReply);

/* User moderation */
router.patch("/user/:id/block", blockUser);

export default router;
