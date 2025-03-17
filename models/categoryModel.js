import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, "Category name is required"],
    },
    parentCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        default: null, // Null means it's a top-level category
    },
});

const Category = mongoose.model("Category", categorySchema);
export { Category };
