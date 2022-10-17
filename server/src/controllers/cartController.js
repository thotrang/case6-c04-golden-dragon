const Cart = require('../models/Cart')
const Item = require('../models/Item')
const itemController = require('./itemController')
const createCart = async (req, res, next) => {

    try {
        const data = {
            itemId: [],
            discount: null,
            bill: []
        }
        const cart = await Cart.create(data)
        return cart
    } catch (err) {
        console.log(err);
        return false
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
const getDetailCart = async (req, res, next) => {
    try {
        let id = req.params.id;
        let cart = await Cart.findById(id).populate({ path: "itemId", populate: { path: 'productId' } });
        if (!cart) {
            res.status(404).json({
                message: 'not found!'
            });
        } else {
            res.status(200).json(cart)
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
        if (!cart) {
            res.status(404).json({
                message: 'not found!'
            });
        } else {
            const item = await itemController.createItem(req, res)
            if (item) {
                item.populate('productId')
                await Cart.findByIdAndUpdate({
                    _id: id
                }, {
                    $push: { itemId: item._id },
                    $set: { totals: cart.totals + item.total }
                })
                cart = await Cart.findById(id).populate({ path: "itemId", populate: { path: 'productId' } })
                res.status(200).json(cart)
            } else {
                res.status(404).json({
                    status: false,
                    message: "product not found !"
                })
            }

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
        if (!cart) {
            res.status(404).json({
                message: 'not found!'
            });
        } else {
            const item = await itemController.getItem(req, res, next)
            await Cart.findByIdAndUpdate({
                _id: id
            }, {
                $pull: { itemId: idItem },
                $set: { totals: cart.totals - item.total }
            })
            await itemController.deleteItem(req, res, next)
            cart = await Cart.findById(id).populate({ path: "itemId", populate: { path: 'productId' } })
            res.status(200).json(cart)
        }
    } catch (err) {
        res.status(400).json(err);
    }
}
const updateAmountItem = async (req, res, next) => {
    let id = req.params.id;
    let id_item = req.params.id_item
    try {
        let cart = await Cart.findById(id);
        if (!cart) {
            res.status(404).json({
                message: 'not found!'
            });
        } else {
            req.idItem = id_item
            let newItem = await itemController.updateItem(req, res, next)
            if(newItem == false){
                return res.status(404).json({
                    status:false
                })
            }
            let totals = 0;
            cart = await Cart.findById(id).populate("itemId")

            for(let item of cart.itemId){
                 totals += item.total
            }
            await Cart.findByIdAndUpdate({
                _id: id
            }, {
                $set: { totals: totals}
            })
            cart = await Cart.findById(id).populate({ path: "itemId", populate: { path: 'productId' } })
            
            // console.log(res.headers)
            return res.status(200).json(cart)
        }
    } catch (err) {
         return res.status(400).json(err);
    }
}
const resetCart = async (req, res, next) => {
    try {
        let id = req.params.id;
        let cart = await Cart.findById(id);
        if (!cart) {
            res.status(404).json({
                message: 'not found!'
            });
        } else {
            await Cart.findByIdAndUpdate({
                _id: id
            }, {
                $set: {
                    itemId: [],
                    discount: null,
                    bill: [],
                    totals: 0
                }
            })
            req.itemArr = cart.itemId
            await itemController.deleteAllInCart(req, res, next)
            cart = await Cart.findById(id)
            res.status(200).json(cart)
        }

    } catch (err) {
        res.status(400).json(err);
    }
}

module.exports = {
    createCart,
    getAllBill,
    pustItem,
    deleteItem,
    resetCart,
    getDetailCart,
    updateAmountItem
}