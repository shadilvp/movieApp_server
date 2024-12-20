import Cart from "../../models/cartModel.js";
import Product from "../../models/productModel.js";
import Order from "../../models/orderModel.js";

export const createOrder = async (req,res) => {
    const {userId} = req.params;
    const {address} =  req.body

    try {
        const cart = await Cart.findOne({userId}).populate("items.productId");
        if(!cart){
            return res.status(404).json({success:false,message:"cart is not found"})
        }
        let totalAmount = 0;
        const updatedItems = cart.items.map(item => {
            let totalPrice = item.productId.price * item.quantity;
            totalAmount += totalPrice;
            return{
                productId : item.productId,
                quantity : item.quantity,
                totalPrice : totalPrice
            };
        });
        
        if (!address || !address.street || !address.city || !address.state || !address.zipCode || !address.country) {
            return res.status(400).json({ success: false, message: "Complete address is required" });
        }
        Order.items = updatedItems
        const newOrder = new Order({
            userId,
            items : updatedItems,
            totalAmount,
            address,
        })
    
        await newOrder.save()
    
        cart.items = []
        cart.totalAmount = 0
        await cart.save()
        
        res.status(200).json({success: true , message: newOrder})
    } catch (error) {
        console.error(error);
        res.status(500).json({success:false,message:error.message})
        
    }

}