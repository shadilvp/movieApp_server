import express from "express"
import { asyncHandler } from "../utils/asyncHandler.js";
import { deleteAdmin, getAllAdmins } from "../controller/adminController/adminController.js";
import { verifyAccessToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get('/admins', asyncHandler(getAllAdmins))
router.put("/delete-admin", verifyAccessToken, asyncHandler(deleteAdmin))

export default router;
