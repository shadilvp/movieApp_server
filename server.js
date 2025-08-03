import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import "./models/index.js"
import cookieParser from "cookie-parser";

import authRouter from "./router/authRouter.js"
import movieRouter from "./router/movieRoutes.js"; 
import errorHandler from "./middlewares/errorHandler.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

// Middlewares
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));

// Routes
app.use('/api', authRouter);
app.use('/api/movies', movieRouter);

// Error handling (should come after all routes)
app.use(errorHandler);

// Server listen
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
