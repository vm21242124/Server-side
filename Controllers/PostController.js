import mongoose from "mongoose";
import PostModel from "../Models/PostModel.js";
import UserModel from '../Models/UserModel.js'
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
  const userid=req.params.id;
  try {
    const user=await UserModel.findById(userid);
    const userpost=await PostModel.find({userId:user._id});
    const friendpost=await Promise.all(
      user.followings.map((freindid)=>{
        return PostModel.find({userId:freindid});
      })
    )
    const allpost=userpost.concat(...friendpost);
    res.status(200).json(allpost)
    
  } catch (error) {
    res.status(500).json(error)
  }
};
export const getUserTimeline= async(req,res)=>{
  const userId=req.params.id;
  try {
    const user=await UserModel.findById(userId);
    const userpost=await PostModel.find({userId:user.id});
    res.status(200).json(userpost);
  } catch (error) {
    res.status(500).json(error)
    
  }
}