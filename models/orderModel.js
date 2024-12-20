import mongoose from "mongoose";

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
            street: {
                type: String,
                required: true
            },
            city: {
                type: String,
                required: true
            },
            state: {
                type: String,
                required: true
            },
            zipCode: {
                type: String,
                required: true
            },
            country: {
                type: String,
                required: true
            }
        },
        status:{
            type:String,
            default:"pending"
        },

    },
    {Timestamp:true} // it automaticallly add the createdAt and updatedAt
)

const Order = mongoose.model("Order",orderSchema)

export default Order;