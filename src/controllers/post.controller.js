import Post from "../models/Post.js";
import User from "../models/User.js";

export const createPost = async (req, res) => {
  const { description, category, selectedFile } = req.body;
  const { userId } = req.params;
  if (!userId) {
    res.status(401).json({ message: "Not userId" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const newPost = new Post({
      description,
      category,
      createdby: user._id,
    });

    if(selectedFile){
      newPost.selectedFile = selectedFile
    }

    const postSaved = await newPost.save();
    await User.findByIdAndUpdate(user._id, {
      posts: [...user.posts, postSaved._id],
    });
    res.status(201).json(postSaved);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const updatedPostById = async (req, res) => {
  const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  }).populate("createdby");
  res.json(updatedPost);
};

export const deletePostById = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id);
    const user = await User.findById(post.createdby);

    const userUpdated = await User.findByIdAndUpdate(
      post.createdby,
      {
        posts: user.posts.filter(
          (post) => id.toString() !== post._id.toString()
        ),
      },
      { new: true }
    );
    await Post.findByIdAndDelete(post._id);

    res.json({ post, user, userUpdated });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const addLike = async (req, res) => {
  const { postId, userId } = req.query;
  try {
    const user = await User.findById(userId);
    const post = await Post.findById(postId);

    if (!user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const updatedPost = await Post.findByIdAndUpdate(
      post._id,
      { likes: [...post.likes, user._id] },
      { new: true }
    );

    return res.json({ updatedPost });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const disLike = async (req, res) => {
  const { postId, userId } = req.query;
  try {
    const user = await User.findById(userId);
    const post = await Post.findById(postId);

    if (!user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const updatedPost = await Post.findByIdAndUpdate(post._id, {
      likes: post.likes.filter(
        (post) => post.toString() !== user._id.toString()
      ),
    }, {new: true});

    res.status(200).json({updatedPost})
  } catch (error) {
    return res.status(500).json(error);
  }
  
};

export const getPosts = async (req, res) => {
  const posts = await Post.find().populate("createdby");
  res.json(posts);
};

export const getPost = async (req, res) => {
  const post = await Post.findById(req.params.id).populate("createdby");
  res.json(post);
};
