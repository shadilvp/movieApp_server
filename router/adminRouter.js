import express from "express"
import { asyncHandler } from "../utils/asyncHandler.js";
import { deleteAdmin, getAllAdmins } from "../controller/adminController/adminController.js";
import { verifyAccessToken } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { getAdminDashboardStats } from "../controller/adminController/dashBoardController.js";

const router = express.Router();

router.get('/admins', asyncHandler(getAllAdmins))
router.put("/delete-admin", verifyAccessToken, asyncHandler(deleteAdmin))
router.get('/dashboard', verifyAccessToken, isAdmin, getAdminDashboardStats)

export default router;
