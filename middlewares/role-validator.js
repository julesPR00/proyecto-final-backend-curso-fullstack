const { response } = require("express");

const hasRole = (...roles) => {
    return (req, res = response, next) => {
        if (!req.user) {
            return res.status(500).json({
                msg: 'It wants to verify the role without validating the token first'
            });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(401).json({
                msg: `Service requires one of this roles ${roles}`
            });
        }

        next();
    }
}

module.exports = {
    hasRole
}