import express from "express"
const app = express()
const port = 3000
import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect( // Connected to the database
            "mongodb+srv://shadilx8:HKh4iMPMtPgGLf5Y@backenddb.pgn5d.mongodb.net/Baby-Products?retryWrites=true&w=majority"
        );
        console.log("Connected to Database");
    } catch (error) {
        console.error("Database connection failed:", error.message);
    }
};

export default connectDB


