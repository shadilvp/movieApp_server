import { Admin } from "../../models/adminModel.js";
import {User} from "../../models/userModel.js"

export const getAllUsers = async (req,res) => {

    console.log("hy")
    let {page, limit, isBlock, search} = req.query;

    let filter = {}

    if(search){
        filter.search = { $regax: search, $options:"i"}
    }
    if(isBlock){
        filter.isBlock = isBlock
    }

    page = parseInt(req.query.page) || 1 ;
    limit = parseInt(req.query.limit) || 10 ;
    let skip = (page - 1) * limit ;

    const users = await User.find()
    .skip(skip).limit(limit)

    const totalUsers = await User.countDocuments();

    return res.status(200).json({
        success: true,
        currentPage: page,
        totalPages: Math.ceil(totalUsers/limit),
        totalUsers : totalUsers,
        users,
    })


}


export const getSpecificUser = async (req,res) => {

    const {userId} = req.params;
    const user = await User.findById(userId)
    if (!user) {
        return  res.status(404).json({success:false,message:"User is not available"})
    }

    res.status(200).json({success:true, user})
}


export const blockUser = async(req,res) => {
    const {userId} = req.params;
    const user = await User.findById(userId)
    if (!user) {
        return  res.status(404).json({success:false,message:"User is not available"})
    }

    user.isBlock = !user.isBlock ;
    await user.save()

    const action = user.isBlock ? "blocked" : "unblocked";

    return res.status(200).json({success:true,message:`User has been successfully ${action}`,user})
}


export const getCurrentUser = async (req, res) => {
    const userId = req.user.id;
    
    // console.log("user",userId)

    const admin = await Admin.findById(userId)
    if (!admin) {
        return  res.status(404).json({success:false,message:"User is not available"})
    }
    res.status(200).json({success:true, message:"current admin data getted succesfully", data:admin})
}


