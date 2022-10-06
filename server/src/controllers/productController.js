const Product = require('../models/Product')
const Category = require('../models/Category')
const Brand = require('../models/Brand')
const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// get All Product
const getAllProduct = async (req, res, next) => {
    const { page } = req.params;
    const perPage = 10;
    const skip = (page - 1) * perPage;
    try {
        const count = await Product.find().countDocuments();
        const product = await Product.find().populate('category', 'name').populate('brand', 'name')
            .skip(skip)
            .limit(perPage);
        console.log(product)
        return res.status(200).json({ product: product, perPage, count })
    } catch (err) {
        console.log(error.message)
    }
}

// 
const createProduct = async(req,res,next) => {
    try {
        let product = req.body;
        product = await Product.create(product);
        let id = product._id;
        let newProduct = await Product.findById(product._id)
        .populate('category','name')
        .populate('brand','name')
        res.status(200).json(newProduct)
    }catch(err) {
        console.log(err);
        res.status(404).json(err)
    }
}

const updateProduct = async(req,res,next) => {
    try {
        let id = req.params.id;
        let product = await Product.findById(id);
        if(!product) {
            res.status(404).json();
        } else {
            let data = req.body;
            await Product.findOneAndUpdate({
                _id : id
            },data);
            data._id = id;
            product = await Product.findById(id).populate('category','name').populate('brand','name');
            res.status(200).json(product)
        }
    }catch(err) {
        console.log(err);
        res.status(404).json(err)
    }
}
// 
const deleteProduct = async (req, res, next) => {
    let id = req.params.id;
    try {
        let product = await Product.findById(id);
        if (!product) {
            res.status(404).json({
                message: "not found"
            })
        } else {
            await product.deleteOne();
            res.status(200).json({
                message: "Delete success",
                product: product
            })
        }
    } catch (err) {
        console.log(err)
        res.status(404).json(err)
    }
}
// get Detail
const getDetail = async(req,res,next) => {
    
}
module.exports = {
    createProduct,
    getAllProduct,
    updateProduct,
    deleteProduct
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