const Cart = require('../models/Cart')
const Item = require('../models/Item')
const itemController = require('./itemController')
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
const getItemIntoCart =  async (req, res, next) => {
    try {
    let id = req.params.id;
    let cart = await Cart.findById(id).populate({path:"itemId",populate:{path:'productId'}});
    if(!cart){
        res.status(404).json({
            message:'not found!'
        });
    }else{
        let items = cart.itemId
        res.status(200).json(items)
    }
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
}
const pustItem = async (req, res, next) => {
    let id = req.params.id;
    try {
        let cart = await Cart.findById(id);
        if(!cart){
            res.status(404).json({
                message:'not found!'
            });
        }else{
            const item = await itemController.createItem(req,res)
            await Cart.findByIdAndUpdate({
                _id:id
            },{
                $push:{itemId: item._id}
            })
            cart = await Cart.findById(id).populate({path:"itemId",populate:{path:'productId'}})
            res.status(200).json(cart)
        }
    } catch (err) {
        res.status(400).json(err);
    }
}
const deleteItem = async (req, res, next) => {
    let id = req.params.id;
    let idItem = req.params.id_item
    try {
        let cart = await Cart.findById(id);
        if(!cart){
            res.status(404).json({
                message:'not found!'
            });
        }else{
            await Cart.findByIdAndUpdate({
                _id:id
            },{
                $pull:{itemId: idItem}
            })
            await itemController.deleteItem(req,res,next)
            cart = await Cart.findById(id).populate({path:"itemId",populate:{path:'productId'}})
            res.status(200).json(cart)
        }
    } catch (err) {
        res.status(400).json(err);
    }
}
// const resetCart = async (req, res, next) => {
//     try {

//     } catch (err) {
//         res.status(400).json(err);
//     }
// }
module.exports = {
    createCart,
    getAllBill,
    pustItem,
    getItemIntoCart,
    deleteItem
}