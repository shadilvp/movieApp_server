import express from "express";
import { blockUser, getAllUsers, getSpecificUser } from "../controller/shared/userController";
import { asyncHandler } from "../utils/asyncHandler";
import { verifyToken } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/users", verifyToken,asyncHandler(getAllUsers))
router.get("/users/:userId",verifyToken,asyncHandler(getSpecificUser))
router.post("/users/block/:userId",verifyToken,asyncHandler(blockUser))

export default router;
