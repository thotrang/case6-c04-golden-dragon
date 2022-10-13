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
    const perPage = 1000;
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
                .populate({ path: 'reviewId', populate: { path: 'userId', select: 'name' } })
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
                    .populate({ path: 'reviewId', populate: { path: 'userId', select: 'name' } })
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
        } else {
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
                    .populate({ path: 'reviewId', populate: { path: 'userId', select: 'name' } })
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
            .populate('brandId', 'name')
            .populate({ path: 'reviewId', populate: { path: 'userId', select: 'name' } })

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
const addStar = async (req, res, next) => {
    try {
        let idProduct = req.params.idProduct;
        let product = await Product.findById(idProduct)
        if (!product) {
            res.status(404).json({
                message: "not found"
            })
        } else {
            let stars = product.stars
            let star1 = req.body
            let rating = 0;
            for(let star of stars) {
                rating += star.text
            }
            for (let star of stars) {
                if (star.userId == star1.userId) {
                    await Product.updateOne({
                        _id: idProduct,
                        'stars.userId': star.userId
                    }, {
                        $set: {
                            "stars.$.text": star1.text,
                            "rating": (rating - star.text + star1.text)/stars.length
                        },
                    })
                    product = await Product.findById(idProduct)
                    res.status(200).json(product)
                    return;
                }
            }
            await Product.findByIdAndUpdate({
                _id: idProduct
            }, {
                $push: {
                    stars: star1
                },
                $set:{
                    rating : (rating + star1.text)/(stars.length + 1)
                }
            })

            product = await Product.findById(idProduct)
            return res.status(200).json(product)
        }
    } catch (e) {
        return res.status(400).json(e)
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
    updateComment,
    addStar
}

