import express from "express"
import { addProduct } from "../controller/adminController/productController.js"
import { getAllProducts } from "../controller/adminController/productController.js" 
import { getAllUsers } from "../controller/adminController/userController.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { deleteProduct } from "../controller/adminController/productController.js"
import { deleteProductPermenently } from "../controller/adminController/productController.js"
import { deleteUser } from "../controller/adminController/userController.js"
import { deleteUserPermenently } from "../controller/adminController/userController.js"
import { blockUser } from "../controller/adminController/userController.js"
import { editProduct } from "../controller/adminController/productController.js"


const router = express.Router()

//product
router.post('/addproduct',asyncHandler(addProduct))//posting an product
router.get('/products', asyncHandler(getAllProducts))
router.patch('/update-product/:productId', asyncHandler(editProduct))
router.delete('/product-delete/:productId',asyncHandler(deleteProduct))
router.delete('/product-delete/permenent/:productId',asyncHandler(deleteProductPermenently))

//user
router.get('/users',asyncHandler(getAllUsers))
router.patch('/block-user/:userId',asyncHandler(blockUser))
router.delete('/user-delete/:userId',asyncHandler(deleteUser))
router.delete('/user-delete/permenent/:userId',asyncHandler(deleteUserPermenently))

export default router;