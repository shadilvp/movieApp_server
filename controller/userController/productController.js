import { Product } from "../../models/productModel.js";


//getting all products in user ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export const getAllProductsUser = async (req, res) => {
    console.log("jh");
        
        
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const category = req.query.category || "";
      // const searchQuery = req.query.search || "";
      const skip = (page - 1) * limit;
      const categoryFilter = category ? { category: category } : {};
  
      // const searchFilter = searchQuery
      //   ? {
      //       $or: [
      //         { name: { $regex: searchQuery, $options: "i" } }
      //       ],
      //     }
      //   : {};

    // find(searchFilter)
        
      const products = await Product.find(categoryFilter).skip(skip).limit(limit);
      const totalProducts = await Product.countDocuments(categoryFilter);
      console.log(products);
      
  
      if (products.length === 0) {
        return res.status(404).json({ success: false, message: "No products found" });
      }
  
      res.status(200).json({
        success: true,
        currentPage: page,
        totalPages: Math.ceil(totalProducts / limit),
        totalProducts: totalProducts,
        products: products,
      });
   
  };


//getting specific ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export const specificProductUser = async (req,res) => {
    
    const {productId} = req.params;
    const product = await Product.findById(productId)
    if(!product){
        res.status(404).json({success:false,message:" product is not found"})
    }

    return res.status(200).json({success:true,message: product})
}



//getting products by catagaory wise ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


export const getProductsByCatagory = async (req,res) => {
    const {catagory} = req.params;

    const products = await Product.find({catagory, isDeleted : false})

    if (products.length == 0) {
        return res.status(404).json({
            success: false,
            message: `No products found in the "${catagory}" category`,
        });
    }

    return res.status(200).json(
        {
            success: true,
            products
        }
    )
}


//edit Product ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export const editProduct = async (req,res) => {
  const {productId} = req.params;

  const { name, price, category, details, image } = req.body;

  const updateProduct = await Product.findByIdAndUpdate(
    productId,
    { name, price, category, details, image },
    { new: true, runValidators: true }
  )
}