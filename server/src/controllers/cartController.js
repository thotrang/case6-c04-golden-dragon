const Cart = require('../models/Cart')

const createCart = async (req,res,next) => {

    try {
        const data = {
            item: [],
            discount: null,
            bill: []
        }
        const cart = await Cart.create(data)
        return cart
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
};
const getAllBill = async (req, res, next) => {
    try {
        const carts = await Cart.find()
        const bills = [];
        for (let cart of carts) {
            for (let item of cart.bill) {
                let bill = {
                    user: cart.userId,
                    text: item
                }
                bills.push(bill)
            }
        }
        res.status(200).json(bills)
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
}
const pustItem = async (req, res, next) => {
    try {

    } catch (err) {
        res.status(400).json(err);
    }
}
const resetCart = async (req, res, next) => {
    try {

    } catch (err) {
        res.status(400).json(err);
    }
}
module.exports = {
    createCart,
    getAllBill,
    resetCart,
    pustItem
}