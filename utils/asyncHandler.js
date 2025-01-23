import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config()

export const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next)
};

export const generateToken = (userId) => {
    return jwt.sign({ _id: userId }, process.env.TOKEN_SECRET )
  };