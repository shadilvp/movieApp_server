import mongoose from "mongoose";
import { Address, validateAddress } from "../../models/addressModel.js";
import { User } from "../../models/userModel.js";


//current users profile ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
export const userProfile = async (req,res) => {
    const {userId} = req.params;
    const user = await User.findOne({_id:userId, isBlocked:false})
    if(!user){
        res.status(400).json({success:false, message:"user is not found"})
    }

    res.status(200).json(
        {
            success:true,
            message:`current user is ${user}`
        }
    )
};


//showing saved addresses ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
export const loadAddress = async (req,res) => {
    const {userId}   = req.params;


    const addresses = await Address.find({userId: userId})

    if(!addresses || addresses.length === 0){
        return res.status(404).json({
            success: false,
            message: "No addresses found for this user."
        });
    }

    return res.status(200).json({
        success:true,
        message: "Addresses retrieved successfully",
        addresses,
    })
}

//adding new address ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
export const addAdress = async (req,res) => {
    
    const {userId}  = req.params;
    
    
    if(!mongoose.Types.ObjectId.isValid(userId)){
        res.status(400).json({success:false, message:"invalid user"})
    }
    const {firstName, lastName, email, mobile, addressLine, city, state, pinCode, country} = req.body;

    const { error } = validateAddress(req.body);

    if (error) {
    return res.status(400).json({ success: false, message: error.details[0].message });
    }

    let addressDoc = await Address.findOne({ userId });

    if (!addressDoc) {
        addressDoc = new Address({
            userId,
            addresses: []
        });
    }


    const newAddress = new Address({
        userId,
        firstName,
        lastName,
        email,
        mobile,
        addressLine,
        city,
        state,
        pinCode,
        country,
    });

    await newAddress.save();

    const user = await User.findById(userId);
    if (!user) {
        return { success: false, message: "User not found" };
    }

    user.addresses.push(newAddress._id);
    await user.save();

    return res.status(200).json({success:true, message : newAddress})
}