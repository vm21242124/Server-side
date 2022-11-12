import express from "express";

import {
  createPost,
  deletePost,
  getPost,
  updatePost,getTimeLinePost
} from "../Controllers/PostController.js";

const router = express.Router();
router.post("/newpost", createPost);
router.put("/updatepost/:id", updatePost);
router.get("/getpost/:id", getPost);
router.delete("/deletepost/:id", deletePost);
router.get("/getTimelinePost/:id", getTimeLinePost)
export default router;
