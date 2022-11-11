import UserModel from "../Models/UserModel.js";

export const getUser=async (req,res)=>{
    const id=req.params.id;
    try {
        const user=await UserModel.findById(id);
        const {password,...otherdetails}=user._doc;
        user? res.status(200).json(otherdetails):res.status(404).json("user not found")
        
    } catch (error) {
        res.status(500).json(error)
    }

}
export const updateUser= async (req,res)=>{
    const id=req.params.id;
    try {
        
    } catch (error) {
        res.status(500).json(error)
        
    }

}
export const deleteUser=async (req,res)=>{

}