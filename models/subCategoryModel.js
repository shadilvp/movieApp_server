import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema(
  {
    subCategoryname: {
      type: String,
      required: [true, "SubCategory is required"],
    },
    image: {
      type: String,
      required: true,
    },
    parentCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  { timestamps: true }
);

const SubCategory = mongoose.model("SubCategory", subCategorySchema);
export { SubCategory };
