import express from "express"
import { addToCart } from "../controller/userController/cartController.js"
import { getCart } from "../controller/userController/cartController.js"
import { removeFromCart } from "../controller/userController/cartController.js"
import { udpateQuantity } from "../controller/userController/cartController.js"
import { createOrder } from "../controller/userController/orderController.js"
import { asyncHandler } from "../utils/asyncHandler.js"

const router = express.Router()

router.post('/addtocart/:userId', asyncHandler(addToCart))
router.get('/cart/:userId', asyncHandler(getCart))
router.post('/cart-remove/:userId', asyncHandler(removeFromCart))
router.post('/cart-quantity/:userId', asyncHandler(udpateQuantity))
router.post('/orders/:userId', asyncHandler(createOrder))

export default router;