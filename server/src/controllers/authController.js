// Thực hiện những công việc xác thực người dùng login logout register

const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const Role = require('../models/Role');
const cartController = require('./cartController');
// @route POST /register
// @description Register user (mô tả)
// access Public (trạng thái)

const register = async (req, res, next) => {
    const { userName, password, name, email, phone, address } = req.body;
    // console.log(req.body);

    // Simple validation (xác nhận đơn giản)

    if (!userName || !password) {
        return res.status(400).json({ success: false, message: 'Không có username and/or password' });
    }
    if (!name || !email) {
        return res.status(400).json({ success: false, message: 'Không có name and/or email' });
    }
    if (!phone || !address) {
        return res.status(400).json({ success: false, message: 'Không có phone and/or địa chỉ' });
    }
    try {
        // Check for existing userName( xem người dùng có tồn tại hay Không)
        const checkUsername = await User.findOne({ userName });
        if (checkUsername) {
            return res.status(400).json({ success: false, message: 'Đã tồn tại tên đăng kí' });
        }
        // Check for existing email( xem email có tồn tại hay Không)
        const checkEmail = await User.findOne({ email });
        if (checkEmail) {
            return res.status(400).json({ success: false, message: 'Đã tồn tại email đăng kí' });
        }
        // Check for existing phone( xem số điện thoại có tồn tại hay Không)
        const checkPhone = await User.findOne({ phone });
        if (checkPhone) {
            return res.status(400).json({ success: false, message: 'Đã tồn tại số điện thoại đăng kí' });
        }

        //all good
        const roleUser = await Role.findOne({ name: 'user' }).populate('userId');
        const hashedPassword = await bcrypt.hash(password, 10);
        const cart = await cartController.createCart();

        const newUser = new User({
            userName,
            password: hashedPassword,
            name,
            email,
            phone,
            address,
            roleId: roleUser._id,
            avatar: {
                public_id: 'a',
                url: 'https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2021/11/20/975861/5-Giong-Cho-Long-Xu-.jpg',
            },
            cartId: cart._id,
        });
        try {
            await newUser.save();
        } catch (error) {
            res.status(500).json({ success: false, message: 'k luu dc vao data' });
        }
        //Return token
        res.json({ success: true, message: 'Đăng kí thành công', newUser });
        next();
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// @route POST /login
// @description Register user (mô tả)
// access Public (trạng thái)

const login = async (req, res, next) => {
    const { userName, password } = req.body;
    // console.log(req.body);
    // Simple validation (xác nhận đơn giản)
    if (!userName || !password) {
        return res.status(400).json({ success: false, message: 'Không có username and/or password' });
    }
    try {
        // Check for existing user( xem người dùng có tồn tại hay Không)
        const user = await User.findOne({ userName }).populate('roleId', 'name');
        if (!user) {
            return res.status(400).json({ success: false, message: 'Tài khoản hoặc mật khẩu Không đúng' });
        }
        // Username found (tên đăng nhập đúng=> check pass)
        const passwordValid = await bcrypt.compare(password, user.password);

        if (!passwordValid) {
            return res.status(400).json({ success: false, message: 'Tài khoản hoặc mật khẩu Không đúng' });
        } else {
            // All good
            // Return token
            const accessToken = jwt.sign(
                {
                    user: user,
                },
                process.env.SECRET_KEY,
                { expiresIn: 36000 },
            );
            res.status(200).json({
                success: true,
                message: 'Người dùng đăng nhập thành công',
                accessToken,
            });
            next();
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
module.exports = {
    login,
    register,
};
