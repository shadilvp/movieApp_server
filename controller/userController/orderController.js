import { Address } from "../../models/addressModel.js";
import Cart from "../../models/cartModel.js";
import {Order} from "../../models/orderModel.js";
import { Product } from "../../models/productModel.js";
import { User } from "../../models/userModel.js";

export const createOrder = async (req,res) => {
    const {userId} = req.params;
    
    const {address} =  req.body;
   

        const cart = await Cart.findOne({userId}).populate("items.productId");
        if(!cart){
            return res.status(404).json({success:false,message:"cart is not found"})
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const validAddress = await Address.findById(address)
        if (!validAddress) {
            return res.status(404).json({ success: false, message: "Address not found. Please provide a valid address." });
        }

        let totalAmount = 0;
        const updatedItems = await Promise.all(cart.items.map(async (item) => {
            let totalPrice = item.productId.price * item.quantity;
            totalAmount += totalPrice;
    
            await Product.findByIdAndUpdate(
                item.productId._id,
                { $inc: { purchasedQuantity: item.quantity } },
                { new: true }
            );
    
            return {
                productId: item.productId,
                quantity: item.quantity,
                totalPrice: totalPrice
            };
        }));
        

        const newOrder = new Order({
            userId,
            items : updatedItems,
            totalAmount,
            address:address,
        })  

    
        await newOrder.save()
    
        cart.items = []
        cart.totalAmount = 0
        await cart.save()
        
        res.status(200).json({success: true , message: `Your order is confirmed succesfully ${newOrder}`})

}
