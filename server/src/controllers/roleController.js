const Role = require('../models/Role');

const getRole = async (req, res, next) => {
    try {
        let roles = await Role.find()
        res.status(200).json(roles)
    } catch (e) {
        res.status(400).json(e)
    }
}
const addRole = async (req, res, next) => {
    try {
        let role = req.body
        let newRole = await Role.create(role);
        res.status(200).json({
            message: 'success',
            role: newRole
        })
    } catch (e) {
        res.status(400).json(e)
    }
}
const getStaffWithRole = async (req, res, next) => {
    try {
        let staffs = [];
        let roles = await Role.find(
            {$or:[ {'name':'seller'}, {'name':'accountant'} ]}
        ).populate('userId')
        for(let role of roles){
            staffs.push(...role.userId)
        }
        res.status(200).json(staffs)
    } catch (e) {
        res.status(400).json(e)
    }
}

module.exports = {
    getRole,
    addRole,
    getStaffWithRole
};