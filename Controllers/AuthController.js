import UserModel from "../Models/UserModel.js";
import bcrypt from "bcrypt";

export const Register = async (req, res) => {
  const { username, email, phone, name, password } = req.body;
  const salt = await bcrypt.genSalt(12);
  const hashpass = await bcrypt.hash(password, salt);
  try {
    const oldUserByEmail = await UserModel.findOne({email:email});
    const oldUserByPhone = await UserModel.findOne({phone:phone});
    
   
    if (!oldUserByEmail && !oldUserByPhone) {
      const newUser = new UserModel({
        username,
        email,
        phone,
        name,
        password: hashpass,
      });
      try {
        await newUser.save();
        res.status(200).json(newUser);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    }else{
        res.status(403).json("already have an account please login now")
    }
  } catch (error) {
    console.log(error);
  }
};
export const Login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json("please fill all the details");
  }
  try {
    const user = await UserModel.findOne({ email: email });
    
   
    if (user) {
      const checkpass = await bcrypt.compare(password, user.password);
      if (checkpass) {
        const {password,...otherdetails}=user._doc;
        res.status(200).json(otherdetails);
      } else {
        res.status(401).json("wrong password");
      }
    } else {
      res.status(404).json("not have an account with us || create one");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
