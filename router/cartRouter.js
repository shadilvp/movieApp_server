// routes/cartRoutes.js
import express from 'express';
import { verifyAccessToken } from "../middlewares/authMiddleware.js";
import { addTOCart, clearCart, getCart, removeFromCart, updateCartItem } from '../controller/adminController/cartController.js';


const router = express.Router();

router.post('/add', verifyAccessToken, addTOCart);
router.get('/', verifyAccessToken, getCart);
router.put('/update', verifyAccessToken, updateCartItem);
router.delete('/remove', verifyAccessToken, removeFromCart);
router.delete('/clear', verifyAccessToken, clearCart   );

export default router;
