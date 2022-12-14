const User = require('../models/User');
const Role = require('../models/Role');
const bcrypt = require('bcrypt');
const jwt =require("jsonwebtoken");

const { body, validationResult } = require('express-validator');
const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const getStaff = catchAsyncErrors(async (req, res, next) => {
    let users = await User.find().populate('roleId', 'name')
    let staffs = []
    for (let staff of users) {
        if (staff.roleId) {
            if (staff.roleId.name == "seller" || staff.roleId.name == "accountant") {
                staffs.push(staff)
            }
        }
    }

    res.status(200).json(staffs)

})
// lấy danh sách khách hàng
const getAll = async (req, res, next) => {
    try {
        let users = await User.find().populate('roleId', 'name')
        let employees = [];
        for (let user of users) {
            if (user.roleId) {
                if (user.roleId.name == "user") {
                    employees.push(user)
                }
            }
        }
        res.status(200).json(employees)

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
            await user.deleteOne();
            await Role.updateMany({ _id: user.roleId }, { $pull: { users: user._id } });
            res.status(200).json(user);
        }
    } catch (err) {
        console.log(err);
        res.status(400).json(err)
    }
}
const addStaff = catchAsyncErrors(async (req, res, next) => {
    const errors = validationResult(req);
    let user = req.body;
    if (!errors.isEmpty()) {
        return res.status(422).send({ errMessage: errors.array() });
    } else {
        let checkName = await User.findOne({
            userName: user.userName,
        });
        if (!checkName) {
            let checkEmail = await User.findOne({
                email: user.email,
            });
            if (!checkEmail) {
                user.password = await bcrypt.hash(user.password, 10);
                let role = await Role.findOne({
                    name: user.role,
                });
                if (role) {
                    user.roleId = role._id;
                    let newUser = await User.create(user);
                    // await Role.updateMany({ _id: role._id }, { $push: { userId: user._id } });
                    newUser = await User.find({
                        _id: newUser._id,
                    }).populate('roleId');
                    res.status(200).json(newUser);
                }
            } else {
                res.status(500).json({
                    message: 'email was existed',
                });
            }
        } else {
            res.status(500).json({
                message: 'userName was existed',
            });
        }
    }
});
// const addStaff = catchAsyncErrors(async (req, res, next) => {
//     const errors = validationResult(req);
//     let user = req.body;
//     if (!errors.isEmpty()) {
//         return res.status(422).send({ errMessage: errors.array() });
//     } else {
//         let checkName = await User.findOne({
//             userName: user.userName
//         })
//         if (!checkName) {
//             let checkEmail = await User.findOne({
//                 email: user.email
//             })
//             if (!checkEmail) {
//                 user.password = await bcrypt.hash(user.password, 10);
//                 let role = await Role.findOne({
//                     name: user.roleId
//                 }).populate('name')
//                 user.roleId = role._id;

//                 let newUser = await User.create(user);

//                 await Role.updateMany({ _id: role._id }, { $push: { userId: user._id } });
//                 res.status(200).json(newUser)
//             } else {
//                 res.status(500).json({
//                     message: 'email was existed'
//                 })
//             }

//         } else {
//             res.status(500).json({
//                 message: 'userName was existed'
//             })
//         }

//     }

// })
// 
const updateUser = async (req, res, next) => {
    try {
        let id = req.params.id;
        let edit = req.body;

        let user = await User.findById(id).populate('roleId', 'name');
        if (!user) {
            res.status(404).json({
                message: "tài khoản không tồn tại "
            });

        } else {

            if(edit.avatar){
                await User.findOneAndUpdate({
                    _id: id
                }, {
                    $set: {
                        name : edit.name,
                        email : edit.email,
                        phone : edit.phone,
                        gender : edit.gender,
                        dob : edit.dob,
                        avatar : edit.avatar,
                        address : edit.address
                    }
                });
            }else{
                await User.findOneAndUpdate({
                    _id: id
                }, {
                    $set: {
                        name : edit.name,
                        email : edit.email,
                        phone : edit.phone,
                        gender : edit.gender,
                        dob : edit.dob,
                        avatar : edit.avatar,
                        address : user.avatar
                    }
                });
            }
            
            user = await User.findById(id).populate('roleId', 'name');
            res.status(200).json({
                user: user,
                message: "update success"
            });
        }
    } catch (err) {
        res.status(400).json(err)
    }
}
// Chua xong
const updatePassword = async (req, res, next) => {
    try {
        let id = req.params.id;
        let editPassword = req.body;

        let user = await User.findById(id).populate('roleId', 'name');
        if (!user) {
            res.status(404).json({
                message: "tài khoản không tồn tại "
            });

        } else {
            await User.findOneAndUpdate({
                _id: id
            }, {
                name: edit.name,
            });
            user = await User.findById(id).populate('roleId', 'name');
            res.status(200).json(user);
        }
    } catch (err) {
        res.status(400).json(err)
    }
}

const getDetail = async (req, res, next) => {
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
const updateRoleUser = async (req, res, next) => {
    try {
        let id = req.params.id;
        let newRole = req.body;
        let user = await User.findById(id).populate('roleId', 'name');
        if (!user) {
            res.status(404).json();
        } else {
            // chú ý role chuyền vào
            let role = await Role.findOne({
                name: newRole.role
            })
            await User.findOneAndUpdate({
                _id: id
            }, { $set: { roleId: role._id } });

            user = await User.findById(id).populate('roleId', 'name');
            res.status(200).json(user);
        }

    } catch (err) {
        res.status(400).json(err)
    }
}
const searchUser = catchAsyncErrors(async (req, res, next) => {
    let search = req.params.q;

    let cursor = await User.find({
        '$or': [
            { name: { $regex: search } }
        ]
    })
    if (cursor) {
        res.json(cursor)
    } else {
        res.json({
            message: 'loi'
        })
    }
})
const searchStaff = async (req, res, next) => {
    let q = req.params.q;

    let users = await User.find().populate({
        path: 'roleId',
        match: { name: { $eq: "seller" } },
        select: 'name'
    })
    let staffs = users.filter((staff) => {
        return staff.roleId != null

    })
    let search = staffs.filter((staff) => {
        return staff.name.toLowerCase().includes(q.toLowerCase())
    })
    res.status(200).json(search)



}
module.exports = {
    getStaff,
    getAll,
    deleteUser,
    addStaff,
    updateUser,
    getDetail,
    updateRoleUser,
    searchStaff,
    searchUser
};
