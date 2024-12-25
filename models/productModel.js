import mongoose from "mongoose"
import joi from "joi"

const productSchema = mongoose.Schema(
    {
        name : {
            type:String,
            unique:true,
            required:[true,"Product name is required"],
        },
        category:{
            type:String,
            required:[true,"Product catagory is required"],
        },
        price:{
            type:Number,
            required:[true,"Product price is required"],
        },
        description:{
            type:String,
            required:[true,"Product description is required"],
        },
        quantity:{
            type:String,
            required:[true,"Product quantity is required"],
        },
        image:{
            type: String,
            required:[true, "Product image URL is required"],
        },
        isDeleted:{
            type:Boolean,
            default:false
        }
    }  
)
const validateProduct = (product) => {
    const schema = joi.object(
        {
            name : joi.string().min(3).required(),
            category : joi.string().valid("Toys","Dress","Nutrition").required(),
            price : joi.number().min(0).required(),
            description : joi.string().min(10).required(),
            quantity : joi.number().min(1).required(),
            image : joi.string().uri().required(),
        })
        return schema.validate(product)
}

const Product = mongoose.model("Product",productSchema)
export  {Product,validateProduct};