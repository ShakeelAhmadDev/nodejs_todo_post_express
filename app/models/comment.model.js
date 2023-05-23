const mongoose = require("mongoose");

// Comment model
const Comment = mongoose.model("Comment", {
  text: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = Comment;
