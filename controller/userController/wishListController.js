import { Product } from "../../models/productModel.js";
import WishList from "../../models/wishList.js";



//Adding a product into wishlsit ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


export const addToWishList = async (req,res) => {
    const {userId} = req.params;
    const {productId} = req.body;

    const productExist = await Product.findById(productId);

    if(!productExist){
        return res.status(404).json({ success: false, message: "Product not found" });
    }

    let wishlist = await WishList.findOne({userId});
    if(!wishlist){
        wishlist = new WishList({userId,products:[]})
    } 

    const alreadyInWishlist = wishlist.products.some(
        (product) => product.productId.toString() === productId
    )

    if(alreadyInWishlist){
        return res.status(400).json({ success: false, message: "Product already in wishlist" });
    }

    wishlist.products.push({ productId });
    await wishlist.save();

    return res.status(200).json({ success: true, message: "Product added to wishlist", wishlist });

}

//showing wishlist products ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export const getWishlist = async (req, res) => {

        const { userId } = req.params;

        const wishlist = await WishList.findOne({ userId }).populate('products.productId');

        if (!wishlist) {
            return res.status(404).json({ success: false, message: "Wishlist not found" });
        }

        return res.status(200).json({ success: true, wishlist });
};

//deleting items from wishlist ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export const deleteFromWishlist = async (req,res) => {
    const {userId} = req.params;
    const {productId} = req.body

    const wishlist = await WishList.findOne({userId})
    if (!wishlist) {
        return res.status(404).json({ success: false, message: "Wishlist not found" });
    }

    const productIndex = wishlist.products.findIndex(
        (product) => product.productId.toString() === productId
    );

    if (productIndex === -1) {
        return res.status(404).json({ success: false, message: "Product not found in wishlist" });
    }

    wishlist.products.splice(productIndex, 1);
    await wishlist.save();

    return res.status(200).json({ success: true, message: "Product removed from wishlist", wishlist });
}