const mongoose = require("mongoose");

const Todo = mongoose.model(
  "Todo",
  new mongoose.Schema({
    title: String,
    description: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    completed: Boolean,
  })
);

module.exports = Todo;
