const User = require('../models/user');
const Role = require('../models/role');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');

const getStaff = async (req, res, next) => {
    try {
        let users = await User.find().populate('roleId', 'name');
        let staffs = []
        for (let user of users) {
            if (user.roleId) {
                if (user.roleId.name == "accountant" || user.roleId.name == "seller") {
                    staffs.push(user)
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
const addStaff = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        let user = req.body;
        if (!errors.isEmpty()) {
            return res.status(422).send({ errMessage: errors.array() });
        } else {
            let checkName = await User.findOne({
                userName: user.userName
            })
            if (!checkName) {
                let checkEmail = await User.findOne({
                    email: user.email
                })
                if (!checkEmail) {
                    console.log(user.password);
                    user.password = await bcrypt.hash(user.password, 10);
                    let role = await Role.findOne({
                        name: user.roleId
                    })
                    user.roleId = role._id;
                    let newUser = await User.create(user);
                    res.status(200).json(newUser)
                } else {
                    res.status(500).json({
                        message: 'email was existed'
                    })
                }

            } else {
                res.status(500).json({
                    message: 'userName was existed'
                })
            }

        }
    } catch (err) {
        res.status(400).json(err)
    }
}
const editUser = async (req, res, next) => {
    try {

    } catch (err) {
        res.status(400).json(err)
    }
}

const getDetail = async (req,res,next) => {
    try {
        let id = req.params.id;
            let user = await User.findById(id).populate('roleId', 'name');
            if (!user) {
                res.status(404).json();
            } else {
                res.status(200).json(user);
            }

    } catch (err) {
        res.status(400).json(err)
    }
}
module.exports = {
    getStaff,
    getAll,
    deleteUser,
    addStaff,
    editUser,
    getDetail
};
