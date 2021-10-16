const { response } = require("express");
const { ObjectId } = require('mongoose').Types;

const User = require('../models/user.model');

const searchUsers = async (req, res = response) => {
    const { term } = req.params;

    const isMongoID = ObjectId.isValid(term);

    if (isMongoID) {
        const user = await User.findById(term);
        return res.json({
            results: (user) ? [user] : []
        });
    }

    const regex = new RegExp(term, 'i');

    const users = await User.find({
        $or: [{ firstName: regex }, { lastName: regex }, { email: regex }],
        $and: [{ state: true }]
    });

    res.json({
        results: users
    })
}

module.exports = {
    searchUsers
}