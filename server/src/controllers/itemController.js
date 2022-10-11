const Item = require("../models/Item")
const Product = require('../models/Product')
const createItem = async (req, res, next) => {
    try {
        const data = req.body;
        let product = await Product.findById(data.productId)
        if (!product) {
            return false
        } else {
            let total = product.price * data.amount

            const item = await Item.create({ ...data, total: total })
            let newItem = await Item.findById(item._id).populate('productId')
            return newItem
        }

    } catch (err) {
        return false
    }
}
const getItem = async (req, res, next) => {
    try {
        const id = req.params.id_item;
        let item = await Item.findById(id);
        if (!item) {
            return false
        } else {
            return item
        }
    } catch (err) {
        return false
    }
}
const deleteItem = async (req, res, next) => {
    try {
        const id = req.params.id_item;
        let item = await Item.findById(id);
        if (!item) {
          return false
        } else {
            return await item.deleteOne();
        }
    } catch (err) {
        return false
    }
}
const updateItem = async (req, res, next) => {
    try {
        const id = req.params.id_item;
        let item = await Item.findById(id);
        if (!item) {
            return false
        } else {
            let product = await Product.findById(item.productId)
            if (!product) {
                return false
            } else {
                const data = req.body.data
                await Item.findOneAndUpdate({
                    _id: id
                }, {
                    $set: {
                        amount: data,
                        total: data * product.price
                    }
                })

                item = await Item.findById(id).populate('productId');
                return item
            }

        }
    } catch (err) {
        return false
    }
}
const deleteAllInCart = async (req, res, next) => {
    let arr = req.itemArr;
    try {
        for (let itemId of arr) {
            let item = await Item.findById(itemId);
            if (!item) {
               return false
            } else {
                console.log('delete item success');
                await item.deleteOne();
            }
        }

    } catch (err) {
        return false
    }
}
module.exports = {
    updateItem, deleteItem, createItem, deleteAllInCart, getItem
};
