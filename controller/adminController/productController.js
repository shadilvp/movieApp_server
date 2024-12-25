import {Product,validateProduct} from "../../models/productModel.js"


export const addProduct = async (req,res) => {
    

        for (const productData of products) {
            const { name, category, price, description, quantity, image } = productData;

            const { error } = validateProduct(productData); 
            if (error) {
                return res.status(400).json({ success: false, message: error.details[0].message });
            }

            const existingProduct = await Product.findOne({ name });
            if (existingProduct) {
                return res.status(404).json({ success: false, message: `Product ${name} already included` });
            }

            const newProduct = new Product({
                name,
                category,
                price,
                description,
                quantity,
                image
            });

            await newProduct.save();
        }

        return res.status(201).json({
            success:true,
            message:"New product is added succesfully", 
            data:"products added succesfully"
        })
}


// Getting all Products ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export const getAllProducts = async (req,res) => {

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip = (page -1 ) * limit 

        const products = await Product.find().skip(skip).limit(limit)

        const totalProducts = await Product.countDocuments();
        
        res.status(200).json({ 
            success: true, 
            currentPage : page,
            totalPages : Math.ceil(totalProducts/limit),
            totalProducts : totalProducts,
            products : products,
        });
}


//Soft-Deleting a product ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export const deleteProduct = async (req, res) => {
    const {productId} = req.params;

    const product = await Product.findByIdAndUpdate(
        productId,
        {isDeleted : true},
        {new: true}
    );
    if(!product){
        res.status(404).json({success:false,message:"Product is not available"})
    }
    return res.status(200).json({success:true,message:"product is deleted succesfully",product})
}

//Hard-Deleting a product ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export const deleteProductPermenently = async (req,res) => {
    const {productId} = req.params;

    const product = await Product.findByIdAndDelete(productId)

    if(!product){
        res.status(404).json({success:false,message:"product is not found"})
    }

    res.status(404).json({success:true,message:"product is permenently deleted",product})
}