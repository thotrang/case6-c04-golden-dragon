const Review = require('../models/Review');
const Product = require('../models/Product')

const addReview = async (req, res, next) => {
    try {
        let data = req.body
        const review = await Review.create(data)
        return review
    }
    catch (res) {
        return {
            status: false,
            message: "review not found"
        }
    }
}
const deleteReview = async (req, res, next) => {
    try {
        let id = req.params.id;
        let review = await Review.findById(id);
        if (!review) {
            return {
                status: false,
                message: "review not found"
            }
        } else {
            await review.deleteOne()
            return {status:true}
        }
    }
    catch (res) {
        return {
            status: false,
            message: "review not found"
        }
    }
}
const editComment = async (req, res, next) => {
    try {
        let id = req.params.id;
        let review = await Review.findById(id);
        if (!review) {
            return {
                status: false,
                message: "review not found"
            }
        } else {
            let data = req.body

            await Review.findByIdAndUpdate({
                _id: id
            }, {
                $set: {
                    comment: data.comment
                }
            })
            return {
                status : true
            }
        }
    }
    catch (res) {
        return false
    }
}
module.exports = {
    addReview,
    deleteReview,
    editComment
}
