import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
    {
        heading: {
            type: String,
            required: true
        },
        messageType: {
            type: String,
            required: true
        },
        message: {
            type: String,
            required: true
        },
        userId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
        
    },
    {timestamps:true}
);

const Notification = mongoose.model("Notification", notificationSchema);

export {Notification} ; 