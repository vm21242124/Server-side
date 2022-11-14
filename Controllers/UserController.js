import UserModel from "../Models/UserModel.js";

export const getalluser = async (req, res) => {
  try {
    const user = await UserModel.find({ isVerified: true });

    console.log(user);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};
export const getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await UserModel.findById(id);
    const { password, ...otherdetails } = user._doc;
    user
      ? res.status(200).json(otherdetails)
      : res.status(404).json("user not found");
  } catch (error) {
    res.status(500).json(error);
  }
};
export const updateUser = async (req, res) => {
  const id = req.params.id;
  const { currentUserId } = req.body;
  if (currentUserId === id) {
    try {
      const user = await UserModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: message });
    }
  } else {
    res.status(403).json("No access to modify the data");
  }
};

export const follow = async (req, res) => {
  const id = req.params.id;
  const { _id } = req.body;
  console.log(id, _id);
  if (_id == id) {
    res.status(403).json("Action Forbidden");
  } else {
    try {
      const followUser = await UserModel.findById(id);
      const followingUser = await UserModel.findById(_id);

      if (!followUser.followers.includes(_id)) {
        await followUser.updateOne({ $push: { followers: _id } });
        await followingUser.updateOne({ $push: { followings: id } });
        res.status(200).json("User followed!");
      } else {
        res.status(403).json("you are already following this id");
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
};

export const unfollowUser = async (req, res) => {
  const id = req.params.id;
  const { _id } = req.body;

  if (_id === id) {
    res.status(403).json("Action Forbidden");
  } else {
    try {
      const unFollowUser = await UserModel.findById(id);
      const unFollowingUser = await UserModel.findById(_id);

      if (unFollowUser.followers.includes(_id)) {
        await unFollowUser.updateOne({ $pull: { followers: _id } });
        await unFollowingUser.updateOne({ $pull: { followings: id } });
        res.status(200).json("Unfollowed Successfully!");
      } else {
        res.status(403).json("You are not following this User");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
};
