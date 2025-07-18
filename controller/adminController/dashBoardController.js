import { Admin } from "../../models/adminModel.js";
import Order from "../../models/orderModel.js";
import { Product } from "../../models/productModel.js";
import { User } from "../../models/userModel.js";

export const getAdminDashboardStats = async (req, res) => {
  try {
    // Basic counts
    const totalUsers = await User.countDocuments({ isDeleted: false });
    const totalAdmins = await Admin.countDocuments({ roll: "admin" });
    const blockedUsers = await User.countDocuments({ isBlock: true });

    const totalProducts = await Product.countDocuments({ isdeleted: false });
    const outOfStockProducts = await Product.countDocuments({ quantity: 0 });

    const totalOrders = await Order.countDocuments();
    const completedOrders = await Order.countDocuments({ status: "Delivered" });
    const pendingOrders = await Order.countDocuments({ status: "Pending" });
    const cancelledOrders = await Order.countDocuments({ status: "Cancelled" });

    // Total sales
    const totalSalesResult = await Order.aggregate([
      { $group: { _id: null, totalRevenue: { $sum: "$totalAmount" } } }
    ]);
    const totalSales = totalSalesResult[0]?.totalRevenue || 0;

    // Average Order Value
    const avgOrderValue = totalOrders > 0 ? (totalSales / totalOrders).toFixed(2) : 0;

    // New users in last 30 days
    const last30Days = new Date();
    last30Days.setDate(last30Days.getDate() - 30);
    const newUsersThisMonth = await User.countDocuments({
      createdAt: { $gte: last30Days },
    });

    // 🔥 Top 5 selling products (by quantity sold)
    const topProducts = await Order.aggregate([
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.productId",
          totalQuantitySold: { $sum: "$items.quantity" },
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "product",
        },
      },
      { $unwind: "$product" },
      {
        $project: {
          _id: 0,
          productId: "$product._id",
          name: "$product.name",
          image: { $arrayElemAt: ["$product.images", 0] },
          totalQuantitySold: 1,
        },
      },
      { $sort: { totalQuantitySold: -1 } },
      { $limit: 5 },
    ]);

    // 📊 Line chart: Orders per day (last 7 days)
    const today = new Date();
    const last7Days = new Date();
    last7Days.setDate(today.getDate() - 6); // include today

    const ordersPerDay = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: last7Days },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // 🥧 Order Status breakdown
    const statusBreakdown = await Order.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json({
      totalUsers,
      totalAdmins,
      blockedUsers,
      totalProducts,
      outOfStockProducts,
      totalOrders,
      completedOrders,
      pendingOrders,
      cancelledOrders,
      totalSales,
      avgOrderValue,
      newUsersThisMonth,
      topProducts,
      ordersPerDay,
      statusBreakdown,
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    res.status(500).json({ message: "Server error while fetching dashboard data" });
  }
};
