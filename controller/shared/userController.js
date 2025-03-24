import {User} from "../../models/userModel"

export const getAllUsers = async (req,res) => {

    const {page, limit, isBlock, search} = req.query;

    let filter = {}

    if(search){
        filter.search = { $regax: search, $options:"i"}
    }
    if(isBlock){
        filter.isBlock = isBlock
    }

    page = parseInt(req.query.page) || 1 ;
    limit = parseInt(req.query.limit) || 10 ;
    const skip = (page - 1) * limit ;

    const users = await User.find().skip(skip).limit(limit)

    const totalUsers = await User.countDocuments();

    res.send(200).json({
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

