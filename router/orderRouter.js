import express from "express";
import { getAllOrders, getMyOrders, placeOrder, updateOrderStatus } from "../controller/adminController/orderController.js";
import { verifyAccessToken } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/isAdmin.js";


const router = express.Router();

router.post("/place", verifyAccessToken, placeOrder); // place an order from cart
router.get("/my-orders", verifyAccessToken, getMyOrders); // user-specific orders
router.get("/all", verifyAccessToken, isAdmin, getAllOrders); // admin
router.put("/status", verifyAccessToken, isAdmin, updateOrderStatus); // admin

export default router;
