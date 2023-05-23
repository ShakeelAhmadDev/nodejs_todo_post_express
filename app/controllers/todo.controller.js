const Todo = require("../models/todo.model");
const User = require("../models/user.model");

exports.findAllTodo = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "User Not found" });
    }
    const todos = await Todo.find({ user: user._id });
    return res.json({ todo: todos });
  } catch (error) {
    return res.json({ message: "Error while getting Todo", error: error });
  }
};

exports.findAllTodoUsers = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "User Not found" });
    }
    const todos = await Todo.find({
      user: {
        $ne: user._id,
      },
    }).populate("user");
    return res.json({ message: "Todo of Other Users", todo: todos });
  } catch (error) {
    return res.json({ message: "Error while getting Todo", error: error });
  }
};

exports.createTodo = async (req, res) => {
  const { title, description, completed, email } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    try {
      const todo = new Todo({ title, description, completed, user: user._id });
      const saved = await todo.save();
      res.json({ message: "Todo Created", todo });
    } catch (error) {
      res.json({ message: "Error while Creating Todo Created", error });
    }
  } else {
    res.json({ message: "No! User Found" });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.body;

    const todo = await Todo.findOneAndDelete({ _id: id });
    if (!todo) {
      return res.json({ message: "No! Todo found" });
    }
    return res.json({ message: "Todo Deleted Successfully" });
  } catch (error) {
    return res.json({ message: "Error while Deleting Todo", error });
  }
};

exports.patchTodo = async (req, res) => {
  try {
    const { todoId, email, updatedFields } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "User Not Found" });
    }

    const todo = await Todo.findOneAndUpdate(
      { _id: todoId, user: user._id },
      updatedFields,
      { new: true }
    );
    if (!todo) {
      return res.json({ message: "No! Todo found" });
    }

    return res.json({ updatedTodo: todo });
  } catch (error) {
    return res.json({ message: "Error while Updating Todo", error });
  }
};
