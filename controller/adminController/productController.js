import {Product,validateProduct} from "../../models/productModel.js"


export const addProduct = async (req,res) => {
    try {
        const {name, catagory, price, description, quantity, image} = req.body

        const {error} = validateProduct(req.body)
        if(error){
            return res.status(400).json({ success: false, message: error.details[0].message })
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
        const {page = 1, limit = 20} = req.query
        const pageNumber = parseInt(page,10)
        const limitNumber = parseInt(limit,20)

        const products = await Product.find()
        .skip((pageNumber -1 )* limitNumber)
        .limit(limitNumber)

        const totalProducts = await Product.countDocuments();
        res.status(200).json({ 
            success: true, 
            products,
            pagination:{
                currentPage : pageNumber,
                totalPages : Math.ceil(totalProducts/limitNumber),
                totalProducts
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}