import express from "express"
import { addToCart, udpateQuantity, removeFromCart, getCart } from "../controller/userController/cartController.js" 
import { createOrder } from "../controller/userController/orderController.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { getAllProductsUser,specificProductUser,getProductsByCatagory } from "../controller/userController/productController.js"
import { addToWishList, getWishlist, deleteFromWishlist } from "../controller/userController/wishListController.js"

const router = express.Router()

router.post('/addtocart/:userId', asyncHandler(addToCart))
router.get('/cart/:userId', asyncHandler(getCart))
router.post('/cart-remove/:userId', asyncHandler(removeFromCart))
router.post('/cart-quantity/:userId', asyncHandler(udpateQuantity))
router.post('/orders/:userId', asyncHandler(createOrder))
router.get('/products',asyncHandler(getAllProductsUser))
router.get('/products/:productsId',asyncHandler(specificProductUser))
router.get('/products/catagoroy/:catagory', asyncHandler(getProductsByCatagory))
router.post('/:userId/wishlist', asyncHandler(addToWishList))
router.get('/:userId/wishlist',asyncHandler(getWishlist))
router.delete('/userId/wishlist',asyncHandler(deleteFromWishlist))

export default router;