import express from "express"
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendNotification } from "../controller/shared/notificationController.js";


const router = express.Router();

router.post('/send-notification', asyncHandler(sendNotification))

export default router;