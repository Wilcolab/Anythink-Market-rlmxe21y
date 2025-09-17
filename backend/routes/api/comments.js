const router = require("express").Router();
const mongoose = require("mongoose");
const Comment = mongoose.model("Comment");

module.exports = router;
// Get all comments
/**
 * @route GET /api/comments
 * @group Comments - Operations about comments
 * @returns {Array.<Comment>} 200 - An array of comment objects
 * @returns {Error} 500 - Failed to fetch comments
 */
router.get("/", async (req, res) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch comments" });
  }
});

// Delete a comment by ID
/**
 * @route DELETE /api/comments/{id}
 * @group Comments - Operations about comments
 * @param {string} id.path.required - Comment ID
 * @returns {object} 200 - Success message
 * @returns {Error} 404 - Comment not found
 * @returns {Error} 500 - Failed to delete comment
 */
router.delete("/:id", async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    res.json({ message: "Comment deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete comment" });
  }
});