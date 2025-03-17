import { addCategory } from "../controller/shared/productController.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import express from "express"

const router = express.Router();

router.post("/categories", asyncHandler(addCategory));

export default router;
