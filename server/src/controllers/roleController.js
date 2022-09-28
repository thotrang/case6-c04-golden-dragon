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
            message:'success',
            role:newRole
        })
    } catch (e) {
        res.status(400).json(e)
    }
}
module.exports = {
    getRole,
    addRole
};