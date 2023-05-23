const Comment = require("../models/comment.model");
const Post = require("../models/post.model");
const User = require("../models/user.model");

exports.createPost = async (req, res) => {
  try {
    const { email, title, content } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ message: "User Not Found" });
    }

    const post = await Post({ title, content, user: user._id, comments: [] });

    const save = await post.save();

    return res.json({ message: "Post Created", Post: save });
  } catch (error) {
    return res.json({ message: "Error while Creating Post", error });
  }
};

exports.createComment = async (req, res) => {
  try {
    const { email, postId, text } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ message: "User Not Found" });
    }

    const comment = new Comment({ text, user: user._id });

    await comment.save();

    const post = await Post.findOne({ _id: postId });

    const comments = [...post.comments, comment];

    const save = await Post.updateOne({ _id: postId }, { $set: { comments } });

    return res.json({ message: "Post Created", UpdatePost: save });
  } catch (error) {
    return res.json({ message: "Error while Creating Post", error });
  }
};

exports.getComments = async (req, res) => {
  try {
    const { email, postId } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ message: "User Not Found" });
    }

    const postWithOtherComments = await await Post.find({
      _id: postId,
      comments: {
        $not: {
          $elemMatch: { user: user._id },
        },
      },
    }).populate("user comments.user");

    return res.json({
      message: "Post Comments",
      postWithOtherComments: postWithOtherComments,
    });
  } catch (error) {
    return res.json({ message: "Error while Creating Post", error });
  }
};
