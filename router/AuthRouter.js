import { adminRegister, googleAuth, loginAdmin, loginUser, logout, refreshAccessToken, userRegister } from "../controller/shared/authController.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import express from "express"

const router = express.Router();

router.post('/register-user', asyncHandler(userRegister));
router.post('/google-auth', asyncHandler(googleAuth));
router.post('/register-admin', asyncHandler(adminRegister));
router.post('/login-user', asyncHandler(loginUser))
router.post('/login-admin', asyncHandler(loginAdmin))
router.post("/logout", asyncHandler(logout))
router.post('/refresh-token', refreshAccessToken)


export default router;

