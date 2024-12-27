import { Order } from "../../models/orderModel.js";
import { Product } from "../../models/productModel.js"


export const totalProductsPurchased = async (req, res) => {
    const totalPurchased = await Product.aggregate([
        {$match:{ isDeleted : false}},
        {$group:{id:null,total:{$sum : "$purchasedQuantity"}}}
    ])
    return res.status(200).json({
        success: true,
        totalPurchased: totalPurchased[0]?.total || 0,
    });
}

export const totalRevenue = async (req,res) => {
    const totalRevenue  = await Order.aggregate([
        {$unwind: "$products"},
        {
            $group:{
                totalRevenue : {$sum:{$multiply:["$products.quantity","$products.price"]}}
            }
        }
    ]);
    return res.status(200).json({
        success: true,
        totalRevenue: totalRevenue[0]?.totalRevenue || 0,
    });

}