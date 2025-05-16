import { Admin } from "../../models/adminModel.js";

export const getAllAdmins = async (req, res) => {
  const admins = await Admin.find({ isDeleted: false });

  const totalAdmins = await Admin.countDocuments({ isDeleted: false });
  // console.log("users================",admins)
  return res.status(200).json({
    success: true,
    totalUsers: totalAdmins,
    admins,
  });
};

export const deleteAdmin = async (req, res) => {

  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Not an admin." });
  }

  const { adminId } = req.body;

  const deletedAdmin = await Admin.findOneAndUpdate(
    { _id: adminId },
    { $set: { isDeleted: true } },
    { new: true }
  );

  if (!deletedAdmin) {
    return res.status(404).json({ message: "Admin not found" });
  }

  res
    .status(200)
    .json({ message: "Admin marked as deleted", admin: deletedAdmin });
};
