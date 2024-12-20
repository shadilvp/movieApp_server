import express from "express"
import { addToCart } from "../controller/userController/cartController.js"
import { getCart } from "../controller/userController/cartController.js"
import { removeFromCart } from "../controller/userController/cartController.js"
import { udpateQuantity } from "../controller/userController/cartController.js"
import { createOrder } from "../controller/userController/orderController.js"
const router = express.Router()

router.post('/addtocart/:userId',addToCart)
router.get('/cart/:userId',getCart)
router.post('/cart-remove/:userId',removeFromCart)
router.post('/cart-quantity/:userId',udpateQuantity)
router.post('/orders/:userId',createOrder)

export default router;