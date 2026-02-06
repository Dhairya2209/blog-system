const router = require("express").Router();
const Post = require("../models/Post");
const auth = require("../middleware/auth");
const role = require("../middleware/role");

// CREATE POST
router.post("/", auth, role(["writer", "admin"]), async (req, res) => {
  try {
    const post = await Post.create({
      title: req.body.title,
      content: req.body.content,
      tags: req.body.tags,
      status: req.body.status,
      author: req.user.id   // ✅ FIXED HERE
    });

    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// UPDATE POST
router.put("/:id", auth, async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }

  if (post.author.toString() !== req.user.id && req.user.role !== "admin") {
    return res.status(403).json({ error: "Access denied" });
  }

  Object.assign(post, req.body);
  await post.save();
  res.json(post);
});

// DELETE POST
router.delete("/:id", auth, async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }

  if (post.author.toString() !== req.user.id && req.user.role !== "admin") {
    return res.status(403).json({ error: "Access denied" });
  }

  await post.deleteOne();
  res.json({ message: "Post deleted" });
});

// GET PUBLISHED POSTS
router.get("/", async (req, res) => {
  const { page = 1, limit = 5, search = "" } = req.query;

  const query = {
    status: "published",
    $or: [
      { title: new RegExp(search, "i") },
      { content: new RegExp(search, "i") },
      { tags: search }
    ]
  };

  const posts = await Post.find(query)
    .skip((page - 1) * limit)
    .limit(Number(limit));

  res.json(posts);
});

module.exports = router;
