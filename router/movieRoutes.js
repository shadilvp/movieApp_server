
import express from "express";
import { createMovie, deleteMovie, getAllMovies, getSpecificMovie, updateMovie } from "../controller/movieController.js";
import { verifyAccessToken } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.get("/", verifyAccessToken, getAllMovies);
router.post("/create", upload.single("image"),verifyAccessToken, createMovie);
router.get('/:id', verifyAccessToken, getSpecificMovie)
router.delete("/:id", verifyAccessToken, deleteMovie);
router.put("/:id", verifyAccessToken, upload.single("poster"), updateMovie);

export default router;
