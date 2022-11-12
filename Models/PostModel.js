import mongoose from "mongoose";
const postSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    desc: String,
    likes: [],
    image: String,
    comments: [],
  },
  {
    timestamps: true,
  }
);
const PostModel=mongoose.model("PostsModel",postSchema)
export default PostModel
