const Item = require("../models/Item")

const createItem = async (req, res, next) => {
    try {
        const data = req.body;
        const item = await Item.create(data)
        let newItem = await Item.findById(item._id).populate('productId')
        res.status(200).json(newItem)
        return newItem
    } catch (err) {
        res.status(400).json(err)
    }
}
const deleteItem = async (req, res, next) => {
    try {
        const id = req.params.id;
        let item = await Item.findById(id);
        if (!item) {
            res.status(404).json({
                message: "not found"
            })
        } else {
            await item.deleteOne();
            res.status(200).json({
                message: "Delete success",
                item: item
            })
        }
    } catch (err) {
        res.status(400).json(err)
    }
}
const updateItem = async (req, res, next) => {
    try {
        const id = req.params.id;
        let item = await Item.findById(id);
        if (!item) {
            res.status(404).json({
                message: "not found"
            })
        } else {
            let data = req.body;
            await Item.findOneAndUpdate({
                _id: id
            }, {
                $set: {
                    amount: data
                }
            })
            item = await Item.findById(id).populate('roleId', 'name');
            res.status(200).json({
                item: item,
                message: "update success"
            });
        }
    } catch (err) {
        res.status(400).json(err)
    }
}
module.exports = {
    updateItem,deleteItem,createItem
};
