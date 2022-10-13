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
const getAllOrderPending = async (req, res, next) => {
    try {
        let orders = await Order.find().populate('userId', 'name');
        res.status(200).json(orders)
    } catch (err) {
        res.status(400).json(err)
    }
}
const myOrder = async (req, res, next) => {
    const idUser = req.params.idUser;
    try {
        const orders = await Order.find({}, { userId: idUser }).populate('userId', 'name')
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
        const id = req.params.id;
        const order = await Order.findById(id)
        if (!order) {
            return res.status(404).json({ message: `not found` })
        } else {
            await Order.findByIdAndUpdate({
                _id: id
            }, {
                status: "pending"
            })

            let order1 = await Order.findById(id).populate('userId', 'name')
            return res.status(200).json(order1)
        }
    } catch (err) {
        return res.status(400).json(err)
    }
}
const delOrder = async (req, res, next) => {
    try {
        const id = req.params.id;
        const order = await Order.findById(id)
        if (!order) {
            return res.status(404).json({ message: `not found` })
        } else {
            await Order.findByIdAndUpdate({
                _id: id
            }, {
                status: "cancel"
            })

            let order1 = await Order.findById(id).populate('userId', 'name')
            return res.status(200).json(order1)
        }
    } catch (err) {
        return res.status(400).json(err)
    }
}
const okOrder = async (req, res, next) => {
    try {
        const id = req.params.id;
        const order = await Order.findById(id)
        if (!order) {
            return res.status(404).json({ message: `not found` })
        } else {
            await Order.findByIdAndUpdate({
                _id: id
            }, {
                status: "ok"
            })

            let order1 = await Order.findById(id).populate('userId', 'name')
            return res.status(200).json(order1)
        }
    } catch (err) {
        return res.status(400).json(err)
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
    getAllOrderPending,
    getDetailOrder,
    deleteOrder,
    setstatus,
    cancelOrder,
    sendOrder,
    myOrder,
    delOrder,
    okOrder
}