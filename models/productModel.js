import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
    },
    displayType: {
      type: String,
      default: "genaral",
      enum: ["genaral", "advanced"]
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
    },
    mrp: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Price must be a positive number"],
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Price must be a positive number"],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [1, "At least one item should be in stock"],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category"
    },
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory"
    },
    brand: {
      type: String,
      required: [true, "Brand is required"],
    },
    vehicleCompatibility: {
      type: [String], // Example: ["Toyota Corolla 2015-2018", "Honda Civic 2020"]
    },
    features: {
      type: [String], // Example: ["Toyota Corolla 2015-2018", "Honda Civic 2020"]
    },
    partNumber: {
      type: String, // Manufacturer part number (MPN)
    },
    images: {
      // Change from 'image' to 'images' (array)
      type: [String], // Array of image URLs
      required: [true, "At least one product image is required"],
    },
    weight: {
      type: Number, // Weight in KG
    },
    dimensions: {
      length: { type: Number, required: true }, // Length in CM
      width: { type: Number, required: true }, // Width in CM
      height: { type: Number, required: true }, // Height in CM
    },
    material: {
      type: String, // Example: "Aluminum", "Steel", "Plastic"
    },
    warranty: {
      type: String, // Example: "1 Year", "6 Months"
    },
    isdeleted: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["Available", "Unavailable"],
      default: "Available",
    },
    color: {
      type: [String],
    },
    visibility: {
      type: Boolean,
      default:false
    },
    relatedItems: {
      type:[String]
    },
    keyInfo:{
      type: String,
      enum: ["general", "advanced"],
      default: "general",
    }
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export { Product };


