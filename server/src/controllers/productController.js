const Product = require('../models/Product')
const ApiFeatures = require("../../utils/apiFeature");
const catchAsyncErrors = require("../middleware/catchAsyncErrors")
const cloudinary = require("cloudinary");


//create Product admin
exports.createProduct =   async (req,res,next) =>{
    let images = [];

    if (typeof req.body.images === "string") {
        images.push(req.body.images);
    } else {
        images = req.body.images;
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: "products",
        });

        imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url,
        });
    }

    req.body.images = imagesLinks;
    req.body.user = req.user.id;

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
        products
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
    // Images Start Here
    let images = [];

    if (typeof req.body.images === "string") {
        images.push(req.body.images);
    } else {
        images = req.body.images;
    }

    if (images !== undefined) {
        // Deleting Images From Cloudinary
        for (let i = 0; i < product.images.length; i++) {
            await cloudinary.v2.uploader.destroy(product.images[i].public_id);
        }

        const imagesLinks = [];

        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: "products",
            });

            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url,
            });
        }

        req.body.images = imagesLinks;
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
    if(!product) {
        return res.status(500).json({
            success: false,
            message: "product not found"
        })
    }
        // Deleting Images From Cloudinary
        for (let i = 0; i < product.images.length; i++) {
            await cloudinary.v2.uploader.destroy(product.images[i].public_id);
        }
    await  product.remove()
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
//get Product by categoryId
//get Product by brandId
//create review or update
exports.createProductReview = async (req,res,next)=>{
    const {rating,comment,productId} = req.body
    const review ={
        user:req.user._id,
        name:req.user.name,
        rating:Number(rating),
        comment
    }
    const product = await Product.findById(productId)
    const  isReviewed =  product.reviews.find(rev =>rev.user.toString()===req.user._id)

    if(isReviewed){
product.reviews.forEach(rev=>{
    if(rev.user.toString()=== req.user.toString())
        ( rev.rating =rating),
       ( rev.comment = comment)
})
    }else{
        product.reviews.push(review)
        product.rating

    }
    let avg = 0
    product.rating = product.reviews.forEach(rev=>{
        avg +=rev.rating
    })
await product.save({
    validateBeforeSave:false,
})
    res.status(200).json({
        success:true
    })

}