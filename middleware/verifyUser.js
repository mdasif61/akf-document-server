const jwt = require("jsonwebtoken");
const User = require('../models/userModels')

const verifyUser = async (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' })
    };

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id)
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized 1' })
        };
        req.user = user;
        next()
    } catch (error) {
        console.error('Authentication error:', error)
        return res.status(401).json({ message: 'Unauthorized 2' })
    }
}

module.exports=verifyUser