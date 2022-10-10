const Order = require('../models/Order');
const createOrder = async (req, res, next) => {
    try {
        const order = await Order.create(req.body)
        res.status(200).json(order)
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
}
const getAllOrder = async (req, res, next) => {
    try {
        let orders = await Order.find().populate('userId', 'name')
        res.status(200).json(orders)
    } catch (err) {
        res.status(400).json(err)
    }
}
const myOrder = async (req, res, next) => {
    const idUser = req.params.idUser;
    try {
        const orders = Order.find({ userId: idUser }).populate('userId', 'name')
        res.status(200).json(orders)
    } catch (err) {
        res.status(400).json(err)
    }
}

const getDetailOrder = async (req, res, next) => {
    try {
        let id = req.params.id;
        let order = await Order.findById(id).populate('userId', 'name')
        res.status(200).json(order)
    } catch (err) {
        res.status(400).json(err)
    }
}
const deleteOrder = async (req, res, next) => {
    let id = req.params.id
    try {
        let order = Order.findById(id);
        if (!order) {
            res.status(404).json({
                success: false,
                message: "order not exist"
            })
        } else {
            await order.deleteOne();
            res.status(200).json("delete success!!")
        }
    } catch (err) {
        console.log(err);
        res.status(400).json(err)
    }
}
const setstatus = async (req, res, next) => {
    try {
        let id = req.params.id;
        let order = Order.findById(id);
        if (!order) {
            res.status(404).json({
                success: false,
                message: "order not exist"
            })
        } else {
            let data = req.body;
            await Order.findByIdAndUpdate({
                _id: id
            }, {
                $set: {
                    status: data
                }
            })
        }
    } catch (err) {
        res.status(400).json(err)
    }
}
const sendOrder = async (req, res, next) => {
    try {
        // req.
    } catch (err) {
        res.status(400).json(err)
    }
}
const cancelOrder = async (req, res, next) => {
    try {
        // req.
    } catch (err) {
        res.status(400).json(err)
    }
}
module.exports = {
    createOrder,
    getAllOrder,
    getDetailOrder,
    deleteOrder,
    setstatus,
    cancelOrder,
    sendOrder,
    myOrder
}