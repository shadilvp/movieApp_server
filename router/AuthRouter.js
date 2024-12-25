import express from "express"
import { userRegister } from "../controller/userController/authController.js"
import { loginUser } from "../controller/userController/authController.js"
import { asyncHandler } from "../utils/asyncHandler.js"

 const router = express.Router()

router.post('/register', asyncHandler(userRegister) )
router.post('/login', asyncHandler(loginUser) )


export default router;