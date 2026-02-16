import Post from "../models/Post.js";
import User from "../models/User.js";
import Reply from "../models/Reply.js";

/**
 * CREATE POST
 * POST /api/posts
 */
export const createPost = async (req, res) => {
  try {
    const { content, userId } = req.body;

    const post = await Post.create({
      content,
      author: userId,
    });

    const populatedPost = await post.populate("author", "username");

    res.status(201).json(populatedPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create post" });
  }
};

/**
 * GET ALL POSTS (HOME FEED)
 * GET /api/posts
 */
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "username")
      .sort({ createdAt: -1 })
      .lean(); // IMPORTANT for mutation below

    // attach reply count to each post
    for (let post of posts) {
      post.repliesCount = await Reply.countDocuments({
        post: post._id,
      });
    }

    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch posts" });
  }
};

/**
 * GET SINGLE POST (POST DETAIL / SEE MORE)
 * GET /api/posts/:id
 */
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "author",
      "username",
    );

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch post" });
  }
};

/**
 * DELETE POST
 * DELETE /api/posts/:id
 */
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Optional: also delete its replies
    await Reply.deleteMany({ post: post._id });

    await post.deleteOne();

    res.json({ message: "Post deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete post" });
  }
};
