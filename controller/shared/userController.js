import { Admin } from "../../models/adminModel.js";
import { User } from "../../models/userModel.js";

//Get alll users ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export const getAllUsers = async (req, res) => {
  let { page, limit, isBlock, search } = req.query;

  let filter = {};

  if (search) {
    filter.search = { $regax: search, $options: "i" };
  }
  if (isBlock) {
    filter.isBlock = isBlock;
  }

  page = parseInt(req.query.page) || 1;
  limit = parseInt(req.query.limit) || 10;
  let skip = (page - 1) * limit;

  const users = await User.find({ isDeleted: false }).skip(skip).limit(limit);

  const totalUsers = await User.countDocuments({ isDeleted: false });
//   console.log("users================", users);
  return res.status(200).json({
    success: true,
    currentPage: page,
    totalPages: Math.ceil(totalUsers / limit),
    totalUsers: totalUsers,
    users,
  });
};

//Get Specific user ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export const getSpecificUser = async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId);
  if (!user) {
    return res
      .status(404)
      .json({ success: false, message: "User is not available" });
  }

  res.status(200).json({ success: true, user });
};

//Block user ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export const blockUser = async (req, res) => {
    // console.log("========hy========")
  const { userId } = req.params;
  console.log(req.params)

  const user = await User.findById(userId);
  if (!user) {
    return res
      .status(404)
      .json({ success: false, message: "User is not available" });
  }

  user.isBlock = !user.isBlock;
  await user.save();

  const action = user.isBlock ? "blocked" : "unblocked";

  return res.status(200).json({
    success: true,
    message: `User has been successfully ${action}`,
    user,
  });
};

//Delete user ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export const deleteUser = async (req, res) => {
  const adminId = req.user.id;
  const admin = await Admin.findById(adminId);

  if(admin.roll !== "admin"){
    return res.status(400).json({message:"access denied"})
  }

  const { userId } = req.params;
  const deletedUser = await User.findByIdAndUpdate(
    { _id: userId },
    { $set: { isDeleted: true } },
    { new: true }
  );

  if (!deletedUser) {
    return res.status(404).json({ message: "Admin not found" });
  }

  res
    .status(200)
    .json({ message: "User marked as deleted", user: deletedUser });
};

//Getting current User ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export const getCurrentUser = async (req, res) => {
  const userId = req.user.id;

  const admin = await Admin.findById(userId);
  if (!admin) {
    return res
      .status(404)
      .json({ success: false, message: "User is not available" });
  }
  res.status(200).json({
    success: true,
    message: "current admin data getted succesfully",
    data: admin,
  });
};
