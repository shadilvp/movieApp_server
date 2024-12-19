import Product from "../../models/productModel.js"


export const addProduct = async (req,res) => {
    try {
        const {name, catagory, price, description, quantity, image} = req.body

        if(!name || !catagory || !price || !description || !quantity || !image){
            return res.status(400).json({success:false, message:"Please fill the required fields"})
        }
        const product = await Product.findOne({name});
        if(product){
            res.status(404).json({success:false,message:"Product is already included"})
        }
        const newProduct = new Product({
            name, 
            catagory, 
            price, 
            description, 
            quantity, 
            image
        })
        await newProduct.save()
        return res.status(201).json({
            success:true,
            message:"New product is added succesfully", 
            data:newProduct
        })
    } catch (error) {
        console.error("Error:",error)
        res.status(500).json({success: false, message:`server is not responding ${error.message}`});
    }
}


// Getting all Products ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export const getAllProducts = async (req,res) => {
    try {
        const products = await Product.find()
        res.status(200).json({ success: true, products });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}