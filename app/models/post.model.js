const mongoose = require("mongoose");
const Comment = require("./comment.model");

const Post = mongoose.model("Post", {
  title: String,
  content: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  comments: [Comment.schema],
});

module.exports = Post;
