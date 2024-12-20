import mongoose from "mongoose";


const cartSchema = mongoose.Schema(
    {
        userId :{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },
        items:[    
            {
            productId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Product",
                required:true,
            },
            quantity:{
                type:Number,
                default:1,
            },
            totalPrice:{
                type:Number,
                default:0
            }
        }],
        totalAmount:{
            type : Number,
            default:0
        },
    }
)

const Cart = mongoose.model("Cart", cartSchema)

export default Cart;