import { getCurrentUser, loginUser, logout, userRegister } from "../controller/authController.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import express from "express"
import { verifyAccessToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post('/register', asyncHandler(userRegister));
router.post('/login', asyncHandler(loginUser))
router.post("/logout", asyncHandler(logout))
router.get('/user', verifyAccessToken,getCurrentUser)


export default router;

