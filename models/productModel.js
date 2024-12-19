import mongoose from "mongoose"

const productSchema = mongoose.Schema(
    {
        name : {
            type:String,
            unique:true,
            required:[true,"Product name is required"],
        },
        catagory:{
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
        }
    }
    
)

const Product = mongoose.model("Product",productSchema)
export default Product;