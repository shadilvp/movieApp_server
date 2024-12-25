import express from "express"
import { addProduct } from "../controller/adminController/productController.js"
import { getAllProducts } from "../controller/adminController/productController.js" 
import { getAllUsers } from "../controller/adminController/userController.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { deleteProduct } from "../controller/adminController/productController.js"
import { deleteProductPermenently } from "../controller/adminController/productController.js"


const router = express.Router()

router.post('/addproduct',asyncHandler(addProduct))//posting an product
router.get('/products', asyncHandler(getAllProducts))
router.get('/users',asyncHandler(getAllUsers))
router.delete('/product-delete/:productId',asyncHandler(deleteProduct))
router.delete('/product-delete/permenent/:productId',asyncHandler(deleteProductPermenently))

export default router;