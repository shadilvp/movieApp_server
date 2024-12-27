import {User} from "../../models/userModel.js";

export const getAllUsers = async (req,res) => {
    
        const page = parseInt(req.query.page) || 1 ;
        const limit = parseInt(req.query.limit) || 20 ;
        const skip = (page - 1) * limit ;

        const users = await User.find().skip(skip).limit(limit)

        const totalUsers = await User.countDocuments();

        res.status(200).json({ 
            success: true, 
            currentPage : page,
            totalPages : Math.ceil(totalUsers/limit),
            totalProducts : totalUsers,
            products : users,
        });
}

//finding a specific user --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- 


export const specificUser = async (req,res) => {
        const {userId} = req.params;
        const user = await User.findById(userId)
        if (!user) {
                res.status(404).json({success:false,message:"User is not available"})
        }
        res.status(200).json({success:true, message:user})
        
}

//blocking the User ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export const blockUser = async (req, res) => {
        const {userId} = req.params;

        const user = await User.findById(userId);
        if (!user) {
                res.status(404).json({success:false,message:"User is not available"})
        }

        user.isBlock = true ;
        await user.save()
        return res.status(200).json({success:true,message:"user is blocked succesfully",user})
}


//Soft Deleting user ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


export const deleteUser = async (req, res) => {
        const {userId} = req.params;

        const user = await User.findByIdAndUpdate(
                userId,
                {isDeleted : true},
                {new: true}
        );
        if (!user) {
                res.status(404).json({success:false,message:"User is not available"})
        }
        return res.status(200).json({success:true,message:"user is deleted succesfully",user})
}

//Deleting A user permenently ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export const deleteUserPermenently = async (req, res) => {
        const {userId} = req.params;

        const user = await User.findByIdAndDelete(userId)

        if(!user){
                res.status(404).json({success:false,message:"user is not found"})
        }

        res.status(404).json({success:true,message:"user is permenently deleted",user})


}

