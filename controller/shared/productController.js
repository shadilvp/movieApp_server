import { Category } from "../../models/categoryModel.js";
import { Product } from "../../models/productModel.js";





// Add new product -----------------------------------------------------------------------------------------------------------------------------------------


export const addNewProduct = async (req, res) => {
    try {
        console.log("Received Files:", req.files); // Debugging

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ success: false, message: "At least one product image is required" });
        }

        console.log("Raw Request Body:", req.body);
        
        const {
            name, description, category, subCategory, quantity, price, 
            brand, vehicleCompatibility, partNumber, weight, material, 
            warranty, length, width, height 
        } = req.body;

        const userId = req.user?.id;
        console.log("User ID:", userId);

        // Validate category
        const mainCategory = await Category.findById(category);
        if (!mainCategory) {
            return res.status(400).json({ success: false, message: "Invalid main category ID" });
        }

        // Validate sub-category
        const subCategoryDoc = await Category.findById(subCategory);
        if (!subCategoryDoc || String(subCategoryDoc.parentCategory) !== String(category)) {
            return res.status(400).json({
                success: false,
                message: "Invalid sub-category. Ensure it belongs to the selected category.",
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
            warranty
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
        return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};




//categories -------------------------------------------------------------------------------------------------------------------------------------


export const addCategory = async (req, res) => {
    try {
        const { name, parentCategory } = req.body;

        // Check if category already exists
        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            return res.status(400).json({ success: false, message: "Category already exists" });
        }

        // Create new category
        const newCategory = new Category({ name, parentCategory });
        await newCategory.save();

        return res.status(201).json({ success: true, message: "Category added successfully", newCategory });
    } catch (error) {
        console.error("Error adding category:", error);
        return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};