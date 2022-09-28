// Thực hiện những công việc xác thực người dùng login logout register

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

// @route POST /register
// @description Register user (mô tả)
// access Public (trạng thái)

router.post('/register', async (req, res) => {
    const { userName, password, name, email, gender } = req.body;
    // console.log(req.body);

    // Simple validation (xác nhận đơn giản)

    if (!userName || !password) {
        return res.status(400).json({ success: false, message: 'không có username and/or password' });
    }
    if (!name || !email) {
        return res.status(400).json({ success: false, message: 'không có name and/or email' });
    }
    // if (!phone || !address) {
    //     return res.status(400).json({ success: false, message: 'không có phone and/or địa chỉ' });
    // }
    try {
        // Check for existing userName( xem người dùng có tồn tại hay không)
        const checkUsername = await User.findOne({ userName });
        if (checkUsername) {
            return res.status(400).json({ success: false, message: 'đả tồn tại tên đăng kí' });
        }
        // Check for existing email( xem email có tồn tại hay không)
        const checkEmail = await User.findOne({ email });
        if (checkEmail) {
            return res.status(400).json({ success: false, message: 'đả tồn tại email đăng kí' });
        }
        // Check for existing phone( xem số điện thoại có tồn tại hay không)
        // const checkPhone = await User.findOne({ phone });
        // if (checkPhone) {
        //     return res.status(400).json({ success: false, message: 'đả tồn tại số điện thoại đăng kí' });
        // }

        //all good
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            userName,
            password: hashedPassword,
            name,
            email,
            gender,
        });
        // console.log(newUser);
        try {
            await newUser.save();
        } catch (error) {
            res.status(500).json({ success: false, message: 'k luu dc vao data' });
        }
        //Return token
        res.json({ success: true, message: 'đăng kí thành công', newUser });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// @route POST /login
// @description Register user (mô tả)
// access Public (trạng thái)

router.post('/login', async (req, res) => {
    const { userName, password } = req.body;
    // console.log(req.body);
    // Simple validation (xác nhận đơn giản)
    if (!userName || !password) {
        return res.status(400).json({ success: false, message: 'không có username and/or password' });
    }
    try {
        // Check for existing user( xem người dùng có tồn tại hay không)
        const user = await User.findOne({ userName });
        if (!user) {
            return res.status(400).json({ success: false, message: 'tài khoản không đúng' });
        }
        // Username found (tên đăng nhập đúng=> check pass)
        const passwordValid = await bcrypt.compare(password, user.password);

        if (!passwordValid) {
            return res.status(400).json({ success: false, message: 'mật khẩu không đúng' });
        } else {
            // All good
            // Return token
            const accessToken = jwt.sign(
                {
                    userId: user._id,
                },
                process.env.SECRET_KEY,
                { expiresIn: 36000 },
            );
            res.json({ success: true, message: 'người dùng đăng nhập thành công', accessToken });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});
module.exports = router;
