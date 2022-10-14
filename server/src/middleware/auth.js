const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    try {
        let authorization = req.headers.authorization;
        if (!authorization) {
            res.status(401).json({
                message: "có token mà hàng lởm "
            })
        } else {
            let accessToken = authorization.split(' ')[1];
            if (!accessToken) {
                res.status(401).json({ success: false, message: 'không tìm thấy mã token' });
            } else {
                let token = accessToken.substring(1,(accessToken.length-1))
                const decoded = jwt.verify(token, process.env.SECRET_KEY);
                req.user = decoded;
                next();
               
            }
        }

    } catch (error) {
        return res.status(403).json({ success: false});
    }
};

module.exports = verifyToken;

