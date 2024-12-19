import express from "express"
import { userRegister } from "../controller/userController/authController.js"
import { loginUser } from "../controller/userController/authController.js"
 const router = express.Router()

router.post('/register',userRegister )
router.post('/login',loginUser)


export default router;