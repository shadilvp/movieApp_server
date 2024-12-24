import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION);
        console.log("Connected to Database");
    } catch (error) {
        console.error("Database connection failed:", error.message);
    }
};

export default connectDB;


