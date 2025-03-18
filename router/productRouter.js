import { addCategory, addNewProduct, getAllProducts } from "../controller/shared/productController.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import upload from "../middlewares/multer.js";
import express from "express"

const router = express.Router();

router.post("/categories", asyncHandler(addCategory));
router.post("/add-product", upload.array("images", 5),asyncHandler(addNewProduct));
router.get('/products', asyncHandler(getAllProducts))

export default router;
