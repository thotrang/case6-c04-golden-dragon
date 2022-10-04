const Product = require('../models/Product')
const Category = require('../models/Category')
const Brand = require('../models/Brand')
const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//create Product admin
const createProduct = catchAsyncErrors(async (req, res, next) => {
    
    const product =   await Product.create(req.body)
    
    console.log(req.body);
    console.log(product)
    if (product) {
        return res.status(201).send({ message: "Create success", data: product });
    }
        return res.status(404).send({ message: "Product had exist" })
})
// get All Product
const getAllProduct = async (req, res, next) => {
    const { page } = req.params;
    const perPage = 5;
    const skip = (page - 1) * perPage;
    try {
        const count = await Product.find().countDocuments();
        const product = await Product.find().populate("categoryId", "name").populate("brandId", "name")
            .skip(skip)
            .limit(perPage);
        console.log(product)
        return res.status(200).json({ product: product, perPage, count })
    } catch (err) {
        console.log(error.message)
    }
}
// update Product
const updateProduct = async (req, res, next) => {
    try {
        let id = req.params.id;
        let edit = req.body;
        let product = await Product.findById(id).populate('categoryId', 'name').populate('brandId', 'name');
        if (!product) {
            res.status(404).json({
                message: " Product isn't exist"
            })
        } else {
            await Product.findOneAndUpdate({
                _id: id
            },
                {
                    $set: {
                        name: edit.name,
                        price: edit.price,
                        description: edit.description,
                        comment: edit.comment,
                        rating: edit.rating,
                        category: mongoose.Types.ObjectId(edit.categoryId),
                        brand: mongoose.Types.ObjectId(edit.brandId)
                    }
            }, {
                strict: false
            })
            product = await Product.findById(id).populate('categoryId', 'name').populate('brandId', 'name');

            res.status(200).json({
                product: product,
                message: "Update succes"
            })
        }
    } catch (err) {
        console.log(err)
        res.status(404).json(err)
    }
}


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
            // await Category.updateMany({_id: product.categoryId},{$pull : {product:product._id}});
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
module.exports = {
    createProduct,
    getAllProduct,
    updateProduct,
    deleteProduct
}
