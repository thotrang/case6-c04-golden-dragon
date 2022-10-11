const Product = require('../models/Product')
const Category = require('../models/Category')
const Brand = require('../models/Brand')
const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const reviewController = require('./reviewController')
// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// get All Product
const getAllProduct = catchAsyncErrors(async (req, res, next) => {
    const { page } = req.params;
    const perPage = 10;
    const skip = (page - 1) * perPage;
    try {
        const count = await Product.find().countDocuments();
        const products = await Product.find().populate('categoryId', 'name').populate('brandId', 'name')
            .skip(skip)
            .limit(perPage);
        return res.status(200).json(products)
    } catch (err) {
        console.log(err.message)
    }
})

// 
const createProduct = async (req, res, next) => {
    try {
        let product = req.body;
        product = await Product.create(product);
        let id = product._id;
        let newProduct = await Product.findById(product._id)
            .populate('categoryId', 'name')
            .populate('brandId', 'name')
        res.status(200).json(newProduct)
    } catch (err) {
        console.log(err);
        res.status(404).json(err)
    }
}

const updateProduct = async (req, res, next) => {
    try {
        let id = req.params.id;
        let product = await Product.findById(id);
        let newProduct = {}
        if (!product) {
            res.status(404).json({
                message: 'not found!'
            });
        } else {
            let data = req.body;
            newProduct = await Product.findOneAndUpdate({
                _id: id
            }, data, { new: true })
                .populate('categoryId', 'name')
                .populate('brandId', 'name');
            res.status(200).json(newProduct)
        }
    } catch (err) {
        console.log(err);
        res.status(404).json(err)
    }
}
const addReview = async (req, res, next) => {
    try {
        let idProduct = req.params.idProduct;
        let product = await Product.findById(idProduct)
        if (!product) {
            return res.status(404).json({
                message: 'product not found '
            })
        } else {
            const review = await reviewController.addReview(req, res, next)
            await Product.findOneAndUpdate({
                _id: idProduct
            }, {
                $push: {
                    reviewId: review._id
                }
            })
            let newProduct = await Product.findById(idProduct)
                .populate('categoryId', 'name')
                .populate('brandId', 'name')
                .populate('reviewId')
            res.status(200).json(newProduct)
        }


    } catch (err) {
        res.status(404).json(err)
    }
}
const deleteReview = async (req, res, next) => {
    try {
        let idProduct = req.params.idProduct;
        let product = await Product.findById(idProduct);
        if (!product) {
            res.status(404).json({
                message: "not found"
            })
        } else {
            let review = await reviewController.deleteReview(req, res, next)
            if (review.status) {
                console.log(review);
                await Product.findOneAndUpdate({
                    _id: idProduct
                }, {
                    $pull: {
                        reviewId: review._id
                    }
                })
                let newProduct = await Product.findById(idProduct)
                    .populate('categoryId', 'name')
                    .populate('brandId', 'name')
                    .populate('reviewId')
                res.status(200).json(newProduct)
            } else {
                res.status(404).json({
                    message: 'not found review'
                })
            }
        }
    } catch (err) {
        res.status(400).json(err)
    }
}
const updateComment = async (req, res, next) => {
    try {
        let idProduct = req.params.idProduct;
        let product = await Product.findById(idProduct);
        if (!product) {
            res.status(404).json({
                message: "not found"
            })
        }else{
            let review = await reviewController.editComment(req, res, next)
            if (!review.status) {
                console.log(review.status);
                res.status(404).json({
                    message: 'not found review 1'
                })
                
            } else {
                let newProduct = await Product.findById(idProduct)
                    .populate('categoryId', 'name')
                    .populate('brandId', 'name')
                    .populate('reviewId')
                res.status(200).json(newProduct)
            }
        }
    } catch (err) {
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
const getDetail = async (req, res, next) => {
    let id = req.params.id;
    try {
        let product = await Product.findById(id)
            .populate('categoryId', 'name')
            .populate('brandId', 'name');
        if (!product) {
            res.status(404).json({
                message: "not found"
            })
        } else {
            res.status(200).json(product)
        }
    } catch (err) {
        console.log(err)
        res.status(404).json(err)
    }
}
module.exports = {
    createProduct,
    getAllProduct,
    updateProduct,
    deleteProduct,
    getDetail,
    addReview,
    deleteReview,
    updateComment
}

//get Product by categoryId
//get Product by brandId
//create review or update
// exports.createProductReview = async (req, res, next) => {
//     const { rating, comment, productId } = req.body
//     const review = {
//         user: req.user._id,
//         name: req.user.name,
//         rating: Number(rating),
//         comment
//     }
//     const product = await Product.findById(productId)
//     const isReviewed = product.reviews.find(rev => rev.user.toString() === req.user._id)

//     if (isReviewed) {
//         product.reviews.forEach(rev => {
//             if (rev.user.toString() === req.user.toString())
//                 (rev.rating = rating),
//                     (rev.comment = comment)
//         })
//     } else {
//         product.reviews.push(review)
//         product.rating

//     }
//     let avg = 0
//     product.rating = product.reviews.forEach(rev => {
//         avg += rev.rating
//     })
//     await product.save({
//         validateBeforeSave: false,
//     })
//     res.status(200).json({
//         success: true
//     })

// }