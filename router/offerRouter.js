// routes/cartRoutes.js
import express from 'express';
import { verifyAccessToken, } from "../middlewares/authMiddleware.js";
import { isAdmin } from '../middlewares/isAdmin.js';
import { createOffer } from '../controller/shared/offerController.js';
import upload from '../middlewares/multer.js';

const router = express.Router();

router.post('/create', upload.single("image"),verifyAccessToken,isAdmin,createOffer );

export default router;
