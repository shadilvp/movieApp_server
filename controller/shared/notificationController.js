import { Notification } from "../../models/notificatonModel.js";

export const sendNotification = async (req,res) => {
    console.log(req.body)
    const {heading, messageType, message, user} = req.body;


    if(!heading && !messageType && !message){
        return res.status(400).json({success: false, message:"data is not given"})
    }

    const newNotification = new Notification({
        heading,
        messageType,
        message,
        userId: user || null
    });

    await newNotification.save()

    return res.status(200).json({success: true, data: newNotification, message: "Notification Send SuccessFully"})

}