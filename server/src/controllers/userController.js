const User = require('../models/user');
const Role = require('../models/role');

const getAccountant = async (req, res, next) => {
    try {
        let users = await User.find().populate('roleId', 'name');
        let accountants = []
        for (let user of users) {
            if (user.roleId) {
                if (user.roleId.name == "accountant") {
                    accountants.push(user)
                }
            }
        }
        res.status(200).json(accountants)

    } catch (err) {
        console.log(err);
        res.status(400).json(err)
    }
}
const getAll = async (req, res, next) => {
    try {
        let users = await User.find().populate('roleId', 'name');
        res.status(200).json(users)

    } catch (err) {
        console.log(err);
        res.status(400).json(err)
    }
}
const deleteUser = async (req, res, next) => {
    let id = req.param.id;
    try {
        let user = await User.findById(id);
        if (!user) {
            res.status(404).json();
        } else {
            await user.delete();
            res.status(204).json({
                message: 'delete success'
            });
        }
    } catch (err) {
        console.log(err);
        res.status(400).json(err)
    }
}
module.exports = {
    getAccountant,
    getAll
};
