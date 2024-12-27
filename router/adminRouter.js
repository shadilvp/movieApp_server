import express from "express"
import { asyncHandler } from "../utils/asyncHandler.js"

import { addProduct,getAllProducts,specificProduct,editProduct,deleteProduct,deleteProductPermenently } from "../controller/adminController/productController.js"
// import { getAllProducts } from "../controller/adminController/productController.js" 
// import { deleteProduct } from "../controller/adminController/productController.js"
// import { deleteProductPermenently } from "../controller/adminController/productController.js"
// import { specificProduct } from "../controller/adminController/productController.js"
// import { editProduct } from "../controller/adminController/productController.js"

import { getAllUsers,specificUser,blockUser,deleteUser,deleteUserPermenently } from "../controller/adminController/userController.js"
// import { deleteUser } from "../controller/adminController/userController.js"
// import { deleteUserPermenently } from "../controller/adminController/userController.js"
// import { blockUser } from "../controller/adminController/userController.js"
// import { specificUser } from "../controller/adminController/userController.js"

import { getDashboardDetails } from "../controller/adminController/dashBoardController.js"

const router = express.Router()

//Dashboard
router.get('/dashboard',asyncHandler(getDashboardDetails)) 

//product
router.post('/addproduct',asyncHandler(addProduct))//posting an product
router.get('/products', asyncHandler(getAllProducts))
router.get('/products/:productId',asyncHandler(specificProduct))
router.patch('/products/:productId/edit', asyncHandler(editProduct))
router.delete('/product-delete/:productId',asyncHandler(deleteProduct))
router.delete('/product-delete/permenent/:productId',asyncHandler(deleteProductPermenently))

//user
router.get('/users',asyncHandler(getAllUsers))
router.get('/users/:userId', asyncHandler(specificUser))
router.patch('/users/:userId/block',asyncHandler(blockUser))
router.delete('/users/:userId/delete',asyncHandler(deleteUser))
router.delete('/users/:userId/delete-permenently',asyncHandler(deleteUserPermenently))

export default router;