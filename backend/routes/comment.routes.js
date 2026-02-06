const router = require("express").Router();
const Comment = require("../models/Comment");
const auth = require("../middleware/auth");

router.post("/:postId", auth, async (req, res) => {
    const comment = await Comment.create({
        content:req.body.content,
        user: req.user.id,
        post: req.params.postId,
    });
    res.json(comment);
});

router.delete("/:id", auth, async (req, res) => {
    const comment = await Comment.findById(req.params.id);
    if(comment.user.toString() !== req.user.id){
        return res.status(403).json({error: "Access denied"});
    } 
    await comment.deleteOne();
    res.json({message: "Comment deleted"});
});

module.exports = router;