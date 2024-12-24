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
            enum : ["pending","processing","shipped","deliveried","canceled"],
            default:"pending"
        }, 

    },
    {timestamps:true} // it automaticallly add the createdAt and updatedAt
)

const validateOrder = (order) => {
    const schema = Joi.object({
        userId: Joi.string().required(),
        items: Joi.array()
            .items(
                Joi.object({
                    productId: Joi.string().required(),
                    quantity: Joi.number().integer().min(1).required(),
                    totalPrice: Joi.number().min(0).required(), 
                })
            )
            .min(1)
            .required(),
        totalAmount: Joi.number().min(0).required(),
        address: Joi.object({
            street: Joi.string().required(),
            city: Joi.string().required(),
            state: Joi.string().required(),
            zipCode: Joi.string().pattern(/^\d{5}(-\d{4})?$/).required(),
            country: Joi.string().required(), 
        }).required(),
        status: Joi.string()
            .valid("pending", "processing", "shipped", "delivered", "canceled")
            .default("pending"), 
    });
    return schema.validate(order)
}
const Order = mongoose.model("Order",orderSchema)

export {Order,validateOrder} ;