import mongoose from "mongoose";

const categorySchema  = new mongoose.Schema(
    {
        categoryname: {
            type: String,
            required: [true, "Category name is required"],
        },
        image: {
            type:String,
            required: true
        }
    },
    { timestamps: true }
)

const Category = mongoose.model("Category", categorySchema);
export { Category };