import express from "express";
import { blockUser, getAllUsers, getSpecificUser, getCurrentUser } from "../controller/shared/userController.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { verifyAccessToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/users", verifyAccessToken,asyncHandler(getAllUsers))
router.get("/users/:userId",verifyAccessToken,asyncHandler(getSpecificUser))
router.post("/users/block/:userId",verifyAccessToken,asyncHandler(blockUser))
router.get("/loginedUser", verifyAccessToken, asyncHandler(getCurrentUser))

export default router;
