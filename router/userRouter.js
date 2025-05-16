import express from "express";
import { blockUser, getAllUsers, getSpecificUser, getCurrentUser, deleteUser } from "../controller/shared/userController.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { verifyAccessToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/users", verifyAccessToken,asyncHandler(getAllUsers))
router.get("/users/:userId",verifyAccessToken,asyncHandler(getSpecificUser))
router.put("/users/block/:userId",verifyAccessToken,asyncHandler(blockUser))
router.get("/loginedUser", verifyAccessToken, asyncHandler(getCurrentUser))
router.put("/delete-user/:userId", verifyAccessToken, asyncHandler(deleteUser))

export default router;
