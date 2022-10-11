const Review = require('../models/Review');
const Product = require('../models/Product')

const addReview = async (req, res, next) => {
    try {
        let data = req.body
        const review = await Review.create(data)
        return review
    }
    catch (res) {
        return false
    }
}
const deleteReview = async (req, res, next) => {
    try {
        let id = req.params.id;
        let review = await Review.findById(id);
        if (!review) {
            return {
                status:false,
                message:"review not found"
            }
        } else {
            await review.deleteOne()
            return true
        }
    }
    catch (res) {
        return false
    }
}
const editReview = async (req,res,next) => {
    try {
        let id = req.params.id;
        let review = await Review.findById(id);
        if (!review) {
            return {
                status:false,
                message:"review not found"
            }
        } else {
            await Review.findByIdAndUpdate({
                _id:id
            },{
                $set:{
                    comment: data.comment
                }
            })
            return true
        }
    }
    catch (res) {
        return false
    }
}
module.exports = {
    addReview,
    deleteReview,
    editReview
}
