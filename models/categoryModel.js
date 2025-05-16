import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    catagory: {
        type: String,
        required: [true, "Category name is required"],
    },
    vehicleType: {
        type: String,
        required: [true, "SubCatagory is Required"]
    }
});

const Category = mongoose.model("Category", categorySchema);
export { Category };
