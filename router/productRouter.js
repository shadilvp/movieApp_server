import {  AddCategory, addNewProduct, AddSubCategory, deleteProducts, editProduct, fetchCategories, fetchSubCategories, getAllProducts, getSpecificProduct } from "../controller/shared/productController.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import upload from "../middlewares/multer.js";
import express from "express"

const router = express.Router();

router.post("/products/add", upload.array("images", 5),asyncHandler(addNewProduct));
router.get('/products', asyncHandler(getAllProducts))
router.get('/products/:productId',asyncHandler(getSpecificProduct))
router.put('/products/delete/:productId', asyncHandler(deleteProducts))
router.put('/products/edit/:productId',  upload.array("images", 5),asyncHandler(editProduct))

//Category & SubCategory

router.post('/category',upload.single("image"),asyncHandler(AddCategory))
router.get('/category', asyncHandler(fetchCategories))

router.post('/sub-category',upload.single("image"),asyncHandler(AddSubCategory))
router.get('/sub-category/:categoryId', asyncHandler(fetchSubCategories))

export default router;
