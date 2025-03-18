import multer from "multer" ;
import cloudinary from "../config/cloudinary.js";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const storage= new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder:"Swapify",
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],

    }
})

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
});
export default upload
