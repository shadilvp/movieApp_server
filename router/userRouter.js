import express from "express"
import { addToCart, udpateQuantity, removeFromCart, getCart } from "../controller/userController/cartController.js" 
import { createOrder, createRazorpayOrder, getAllOrders, getSpecificUserOrders, verifyRazorpayPayment} from "../controller/userController/orderController.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { getAllProductsUser,specificProductUser,getProductsByCatagory } from "../controller/userController/productController.js"
import { addToWishList, getWishlist, deleteFromWishlist } from "../controller/userController/wishListController.js"
import { addAdress, loadAddress, userProfile } from "../controller/userController/profileController.js"
import { getCurrentUser } from "../controller/userController/authController.js"
import { verifyToken } from "../middlewares/authMiddleware.js"


const router = express.Router()

//profile
    router.get("/:userId", asyncHandler(getCurrentUser));
    router.get('/profile/:userId',asyncHandler(userProfile))
    //userAdress
    router.get('/profile/address/:userId',asyncHandler(loadAddress))
    router.post('/profile/address/:userId',asyncHandler(addAdress))

//cart
router.post('/cart/:userId', verifyToken,asyncHandler(addToCart))
router.get('/cart/:userId',asyncHandler(getCart))
router.post('/cart', verifyToken, asyncHandler(removeFromCart));
router.post('/cart-quantity', verifyToken,asyncHandler(udpateQuantity))

//order
router.get('/Orders/allOrders',asyncHandler(getAllOrders))
router.post('/orders/:userId', asyncHandler(createOrder))
router.get('/orders/:userId', asyncHandler(getSpecificUserOrders))

router.post('/razorpay/order/:userId', asyncHandler(createRazorpayOrder));
router.post('/razorpay/payment/:userId', asyncHandler(verifyRazorpayPayment));



//products page
router.get('/products/:productId',asyncHandler(specificProductUser))
router.get('/products/catagoroy/:catagory', asyncHandler(getProductsByCatagory))
//wishlist
router.post('/:userId/wishlist', asyncHandler(addToWishList))
router.get('/:userId/wishlist',asyncHandler(getWishlist))
router.delete('/userId/wishlist',asyncHandler(deleteFromWishlist))

export default router;