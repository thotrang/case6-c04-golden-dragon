const User = require('../models/user');
const Role = require('../models/role');

const getStaff = async (req, res, next) => {
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
        let query = req.query.page;
        let limit = 10;
        let offset = 0;
        if (query) {
            let page = + query;
            offset = (page - 1) * limit
        }
        accountants = accountants.limit(limit).skip(offset)
        res.status(200).json(accountants)

    } catch (err) {
        console.log(err);
        res.status(400).json(err)
    }
}
const getAll = async (req, res, next) => {
    try {
        let query = req.query.page;
        let limit = 2;
        let offset = 0;
        if (query) {
            let page = + query;
            offset = (page - 1) * limit
        }
        let users = await User.find().populate('roleId', 'name').limit(limit).skip(offset)
        res.status(200).json(users)

    } catch (err) {
        console.log(err);
        res.status(400).json(err)
    }
}
const deleteUser = async (req, res, next) => {
    let id = req.params.id;

    try {
        let user = await User.findById(id);
        if (!user) {
            res.status(404).json({
                message: 'not found'
            });
        } else {
            await user.delete();
            res.status(204).json({
                message: 'delete success',
                user: user
            });
        }
    } catch (err) {
        console.log(err);
        res.status(400).json(err)
    }
}
const addUser = async (req, res, next) => {
    try {
        let user = req.body;
        let newUser = await User.create(user);
        res.status(200).json(newUser)
    } catch (err) {
        res.status(400).json(err)
    }
}


module.exports = {
    getStaff,
    getAll,
    deleteUser,
    addUser
};
