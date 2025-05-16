import { Category } from "../../models/categoryModel.js";
import { Product } from "../../models/productModel.js";
import mongoose from "mongoose";

// Add new product -----------------------------------------------------------------------------------------------------------------------------------------

export const addNewProduct = async (req, res) => {
  try {
    console.log("Received Files:", req.files); // Debugging

    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({
          success: false,
          message: "At least one product image is required",
        });
    }

    console.log("Raw Request Body:", req.body);

    const {
      name,
      description,
      category,
      quantity,
      price,
      brand,
      vehicleCompatibility,
      partNumber,
      weight,
      material,
      warranty,
      length,
      width,
      height,
    } = req.body;

    const userId = req.user?.id;
    console.log("User ID:", userId);

    // Validate category
    const mainCategory = await Category.findById(category);
    if (!mainCategory) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid main category ID" });
    }

    // Upload images to Cloudinary
    const imageUrls = req.files.map((file) => file.path);

    // const imageUrl = req.file.path;

    // Prepare product data
    const productData = {
      name,
      description,
      category,
      quantity: Number(quantity),
      price: Number(price),
      brand,
      vehicleCompatibility: vehicleCompatibility.split(","), // Convert CSV to array
      partNumber,
      images: imageUrls, // Store Cloudinary image URLs
      weight: Number(weight),
      dimensions: {
        length: Number(length),
        width: Number(width),
        height: Number(height),
      },
      material,
      warranty,
    };

    console.log("Parsed Product Data:", productData);

    // Create new product
    const newProduct = new Product(productData);
    await newProduct.save();

    return res.status(201).json({
      success: true,
      message: "New product added successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error("Server Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

//categories -------------------------------------------------------------------------------------------------------------------------------------

export const addCategory = async (req, res) => {
  try {
    const { catagory, vehicleType } = req.body;

    // Create new category
    const newCategory = new Category({ catagory, vehicleType });
    await newCategory.save();

    return res
      .status(201)
      .json({
        success: true,
        message: "Category added successfully",
        newCategory,
      });
  } catch (error) {
    console.error("Error adding category:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

export const getCategories = async (req,res) => {
    const catagories = await Category.find()
}

//get all products ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export const getAllProducts = async (req, res) => {
  try {
    console.log("hello");
    let { page, limit, search, category, minPrice, subCategory, maxPrice } =
      req.query;

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    const skip = (page - 1) * limit;

    let filter = {};

    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    if (category) {
      filter.category = category;
    }

    if (subCategory) {
      filter.subCategory = subCategory;
    }

    if (minPrice && maxPrice) {
      filter.price = { $gte: parseInt(minPrice), $lte: parseInt(maxPrice) };
    } else if (minPrice) {
      filter.price = { $gte: parseInt(minPrice) };
    } else if (maxPrice) {
      filter.price = { $lte: parseInt(maxPrice) };
    }

    const products = await Product.find(filter)
      .populate("category", "name")
      .skip(skip)
      .limit(limit);

    const totalProducts = await Product.countDocuments(filter);

    return res.status(200).json({
      success: true,
      products,
      totalProducts,
      totalPages: Math.ceil(totalProducts / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error("Server Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

//get specific product ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export const getSpecificProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    // Validate productId
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid product ID" });
    }

    // Find product by ID
    const product = await Product.findById(productId).populate(
      "category",
      "name"
    );

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    return res.status(200).json({ success: true, product });
  } catch (error) {
    console.error("Error fetching product:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

export const deleteProducts = async (req, res) => {
  const { productId } = req.params;

  const deletedProduct = await Product.findByIdAndUpdate(
    { _id: productId },
    { $set: { isDeleted: true } },
    { new: true }
  );

  if (!deletedProduct) {
    return res.status(404).json({ message: "product not found" });
  }

  res
    .status(200)
    .json({ message: "Product marked as deleted", product: deletedProduct });
};
