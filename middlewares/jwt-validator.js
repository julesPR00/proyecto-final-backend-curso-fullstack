const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/user.model');

const validateJWT = async (req = request, res = response, next) => {
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'No token in petition'
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        const user = await User.findById(uid);

        if (!user) {
            return res.status(401).json({
                msg: 'Invalid token - user doesnt exists on db'
            });
        }

        if (!user.state) {
            return res.status(401).json({
                msg: 'Invalid token - user state: false'
            });
        }

        req.user = user;

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Invalid token'
        });
    }
}

module.exports = {
    validateJWT
}