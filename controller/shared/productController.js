import { Category } from "../../models/categoryModel.js";
import { Product } from "../../models/productModel.js";





// Add new product -----------------------------------------------------------------------------------------------------------------------------------------


export const addNewProduct = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: "Product image is required" });
        }

        console.log("Raw Request Body:", req.body);

        const { name, description, category, subCategory, quantity, price, condition, location, seller } = req.body;
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

        // Prepare product data
        const productData = {
            name,
            description,
            category, // Storing ObjectId
            subCategory, // Storing ObjectId
            quantity: Number(quantity),
            price: Number(price),
            image: req.file.path,
            condition,
            location,
            seller,
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