import { Category } from "../../models/categoryModel.js";
import { Product } from "../../models/productModel.js";
import mongoose from "mongoose";
import { SubCategory } from "../../models/subCategoryModel.js";

// Add new product -----------------------------------------------------------------------------------------------------------------------------------------

export const addNewProduct = async (req, res) => {
  try {
    console.log("hy");
    console.log("Received Files:", req.files);

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one product image is required",
      });
    }

    console.log("Raw Request Body:", req.body);

    const {
      name,
      description,
      category,
      subCategory,
      quantity,
      mrp,
      price,
      brand,
      vehicleCompatibility,
      features,
      partNumber,
      weight,
      material,
      warranty,
      length,
      width,
      height,
      color,
    } = req.body;

    const userId = req.user?.id;
    console.log("User ID:", userId);

    if (
      !name ||
      !description ||
      !category ||
      !subCategory ||
      !quantity ||
      !mrp ||
      !price
    ) {
      return res.status(400).json({
        success: false,
        message: " More Fields are required",
      });
    }

    // Upload images to Cloudinary
    const imageUrls = req.files.map((file) => file.path);

    // const imageUrl = req.file.path;

    // Prepare product data
    const productData = {
      name,
      description,
      category,
      subCategory,
      quantity: Number(quantity),
      mrp: Number(mrp),
      price: Number(price),
      brand,
      color: JSON.parse(color),
      features: JSON.parse(features),
      vehicleCompatibility: JSON.parse(vehicleCompatibility),
      partNumber,
      images: imageUrls, // Store Cloudinary image URLs
      weight: weight ? Number(weight) : 0,
      dimensions: {
        length: length ? Number(length) : 0,
        width: width ? Number(width) : 0,
        height: height ? Number(height) : 0,
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

// Adding new Category

export const AddCategory = async (req, res) => {
  const image = req.file;
  const { categoryname } = req.body;

  if (!categoryname || !image) {
    return res
      .status(400)
      .json({ success: false, message: "Name and image are required" });
  }

  const imageUrl = image.path;

  const newCategory = await Category.create({
    categoryname,
    image: imageUrl,
  });
  console.log("category", newCategory);

  return res.status(201).json({
    success: true,
    message: "New category added successfully",
    category: newCategory,
  });
};

// Fetching Categories

export const fetchCategories = async (req, res) => {
  const categories = await Category.find();
  return res.status(200).json({
    success: true,
    message: "Categories fetched succesfully",
    categories,
  });
};

// Adding new SubCategory

export const AddSubCategory = async (req, res) => {
  const image = req.file;
  const { name, categoryId } = req.body;

  if (!name || !image) {
    return res
      .status(400)
      .json({ success: false, message: "Name and image are required" });
  }

  const imageUrl = image.path;

  const newSubCategory = await SubCategory.create({
    SubCategoryname: name,
    parantCategory: categoryId,
    image: imageUrl,
  });
  console.log("Subcategory", newSubCategory);

  return res.status(201).json({
    success: true,
    message: "New Subcategory added successfully",
    category: newSubCategory,
  });
};

// Fetching subCategories

export const fetchSubCategories = async (req, res) => {
  const { categoryId } = req.params;
  const subCategories = await SubCategory.find({ parentCategory: categoryId });
  return res.status(200).json({
    success: true,
    message: "SubCategories fetched succesfully",
    subCategories,
  });
};
