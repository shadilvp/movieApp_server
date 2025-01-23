import mongoose from "mongoose";
import Joi from "joi";

const orderSchema = mongoose.Schema(
    {
        userId:{
            type : mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        items:[
            {
                productId:{
                    type:mongoose.Schema.Types.ObjectId,
                    ref:"Product",
                    required:true
                },
                quantity:{
                    type:Number,
                    required:true
                },
                totalPrice:{
                    type:Number,
                    required:true
                },
            },
        ],
        totalAmount:{
            type:Number,
            required:true,
        },
        address: {
            type : mongoose.Schema.Types.ObjectId,
            ref:"Address",
            required:true
        },
        status:{
            type:String,
            enum : ["pending","processing","shipped","deliveried","canceled"],
            default:"pending"
        },
        paymentStatus:{
            type:String,
            value:"unpaid"
        }

    },
    {timestamps:true}
);


const Order = mongoose.model("Order",orderSchema)

export {Order} ;