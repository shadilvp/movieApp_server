import { Order } from "../../models/orderModel.js";
import { Product } from "../../models/productModel.js"
import { User } from "../../models/userModel.js";


export const getDashboardDetails = async (req,res) => {
    
   const totalUsers = await User.countDocuments();

   const totalProducts = await Product.countDocuments({isDeleted:false});

   const totalOrders = await Order.countDocuments();

   const totalRevenue = await Order.aggregate([
        {$group : {_id:null,totalRevenue:{$sum:"$totalAmount"} } }
   ]);

   const totalPurchased = await Product.aggregate([
        {$match:{isDeleted:false}},
        {$group:{_id:null,total:{$sum:"$purchasedQuantity"}}}
   ]);

   res.status(200).json({
    success: true,
    data: {
        totalUsers,
        totalProducts,
        totalOrders,
        totalRevenue: totalRevenue[0]?.totalRevenue || 0,
        totalPurchased: totalPurchased[0]?.total || 0,
    },
});
}





// export const totalProductsPurchased = async (req, res) => {
//     const totalPurchased = await Product.aggregate([
//         {$match:{ isDeleted : false}},
//         {$group:{id:null,total:{$sum : "$purchasedQuantity"}}}
//     ])
//     return res.status(200).json({
//         success: true,
//         totalPurchased: totalPurchased[0]?.total || 0,
//     });
// }

// export const totalRevenue = async (req,res) => {
//     const totalRevenue  = await Order.aggregate([
//         {$unwind: "$products"},
//         {
//             $group:{
//                 totalRevenue : {$sum:{$multiply:["$products.quantity","$products.price"]}}
//             }
//         }
//     ]);
//     return res.status(200).json({
//         success: true,
//         totalRevenue: totalRevenue[0]?.totalRevenue || 0,
//     });

// }