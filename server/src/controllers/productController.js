const Product = require('../models/Product')
const ApiFeatures = require("../../utils/apiFeature");
const catchAsyncErrors = require("../middleware/catchAsyncErrors")


//create Product admin
exports.createProduct =   async (req,res,next) =>{
    const product = await Product.create(req.body)
     res.status(201).json({
        success:true,
        product
    })
}
//getAll
exports.getAllProducts = async (req,res) =>{
    const resultPerPage = 10;
    const productsCount = await Product.countDocuments()
    const  apiFeature = new ApiFeatures(Product.find(),req.query)
        .search()
        .filter()
        .pagination(resultPerPage)
    let products = await  apiFeature.query;
    // let filteredProductsCount = products.length
    // apiFeature.pagination(resultPerPage)
    // products = await  apiFeature.query

    res.status(200).json(
        {
            message:"true",
            products,
            productsCount
            // resultPerPage,
            // filteredProductsCount,
        }
    )
}
//update-admin
exports.updateProduct =  catchAsyncErrors(async (req,res,next)=>{
    let product = Product.findById(req.params.id)
    if(!product){
        return res.status(500).json({
            success:false,
            message:"Product not found"
        })
    }
    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify: false
    })
    res.status(200).json({
        success:true,
        product
    })
});
// delete
exports.deleteProduct = async (req,res,next)=>{
    const product = await Product.findById(req.params.id)
    if(!product){
        return res.status(500).json({
            success:false,
            message:"product not found"
        })
    }
    await  product.deleteOne()
    res.status(200).json({
        success:true,
        message:"delete success"
    })
}
//get product details
exports.getProductDetails = async (req,res,next)=>{
    const product = await  Product.findById(req.params.id)
    if(!product){ const product = await Product.findById(req.params.id)
        if(!product){
            return res.status(404).json({
                success:false,
                message:"product not found"
            })
        }
        res.status(200).json({
            success:true,
            product,
            productCount,
            message:"delete success"
        })

    }
}