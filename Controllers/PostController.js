import mongoose from "mongoose";
import PostModel from "../Models/PostModel.js";

export const createPost = async (req, res) => {
  const newPost = new PostModel(req.body);
  try {
    await newPost.save();
    res.status(200).json("post Created");
  } catch (error) {
    res.status(500).json(error);
  }
};
export const getPost = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await PostModel.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};
export const deletePost = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;
  try {
    const post = await PostModel.findById(id);
    if (post.userId == userId) {
      await post.deleteOne();
      res.status(200).json("post deleted successfully");
    } else {
      res.status(403).json("you cant delete the post");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
export const updatePost = async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.body;
  try {
    const post = await PostModel.findById(postId);
    if (post.userId == userId) {
      await PostModel.updateOne({ $set: req.body });
      res.status(200).json("post Update suceess");
    } else {
      res.status(403).json("you dont have access to update this post");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
export const likePost = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;
  try {
    const post = await PostModel.findById(id);
    if (!post.likes.includes(userId)) {
      await post.updateOne({ $push: { likes: userId } });
      res.status(200).json("liked post");
    } else {
      await post.updateOne({ $pull: { likes: userId } });
      res.status(200).json("unliked the post");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getTimeLinePost = async (req, res) => {
  const userId = req.params.id;
  console.log(userId)
  try {
    const currentUserPosts = await PostModel.find({ userId: userId });
    
    const followingPost = await PostModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "PostsModels",
          localField: "followings",
          foreignField: "userId",
          as: "followingPost",
        },
      },
      {
        $project: {
          followingPost: 1,
          _id: 0,
        },
      },
    ]);
    
    res.status(200).json(
      currentUserPosts
        .concat(...followingPost[0].followingPost)
        .sort((a, b) => {
          return b.createdAt - a.createdAt;
        })
    );
  } catch (error) {
    res.status(500).json(error);
  }
};
