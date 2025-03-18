import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product name is required"],
    },
    description: {
        type: String,
        required: [true, "Product description is required"],
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
        ref: "Category",
        required: [true, "Product category is required"],
    },
    brand: {
        type: String,
        required: [true, "Brand is required"],
    },
    vehicleCompatibility: {
        type: [String], // Example: ["Toyota Corolla 2015-2018", "Honda Civic 2020"]
        required: [true, "Compatible vehicles are required"],
    },
    partNumber: {
        type: String, // Manufacturer part number (MPN)
        unique: true,
        required: [true, "Part number is required"],
    },
    images: {  // Change from 'image' to 'images' (array)
        type: [String], // Array of image URLs
        required: [true, "At least one product image is required"],
    },
    weight: {
        type: Number, // Weight in KG
        required: [true, "Weight is required"],
    },
    dimensions: {
        length: { type: Number, required: true }, // Length in CM
        width: { type: Number, required: true },  // Width in CM
        height: { type: Number, required: true }, // Height in CM
    },
    material: {
        type: String, // Example: "Aluminum", "Steel", "Plastic"
    },
    warranty: {
        type: String, // Example: "1 Year", "6 Months"
    },
    status: {
        type: String,
        enum: ["Available", "Out of Stock", "Discontinued"],
        default: "Available",
    },
},
{ timestamps: true },
);

const Product = mongoose.model("Product", productSchema);
export { Product };













// import mongoose from "mongoose";

// const productSchema = mongoose.Schema(
//     {
//         name : {
//             type:String,
//             unique:true,
//             required:[true,"Product name is required"],
//         },
//         category: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "Category",
//             required: [true, "Product category is required"],
//         },
//         subCategory: {
//             type: String,
//             required: [true, "Product sub-category is required"],
//         },
//         price:{
//             type:Number,
//             required:[true,"Product price is required"],
//         },
//         description:{
//             type:String,
//             required:[true,"Product description is required"],
//         },
//         quantity:{
//             type:String,
//             required:[true,"Product quantity is required"],
//         },
//         image:{
//             type: String,
//             required:[true, "Product image URL is required"],
//         },
//         purchasedQuantity:{
//             type:Number,
//             default:0,
//         },
//         status:{
//             type:String,
//             enum:["available","unavailable"],
//             default:"available",
//         },
//         isDeleted:{
//             type:Boolean,
//             default:false
//         }
//     }  
// )


// const   Product = mongoose.model("Product",productSchema)
// export  {Product};