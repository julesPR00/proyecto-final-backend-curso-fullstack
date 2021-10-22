const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user.model');

const usersGet = async (req = request, res = response) => {
    const { limit = 5, from = 0 } = req.query;
    const query = { state: true };

    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(Number(from))
            .limit(Number(limit))
    ]);

    res.json({
        total,
        users
    });
}

const usersPost = async (req = request, res = response) => {
    const { firstName, lastName, email, password, role } = req.body;
    const user = new User({ firstName, lastName, email, password, role });

    // Password encryption
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    // Save in db
    await user.save();

    user.createdAt;
    user.updatedAt;

    res.json(user);
}

const usersPut = async (req = request, res = response) => {
    const { id } = req.params;
    const { _id, password, email, ...data } = req.body;

    if (password) {
        // Encrypt password
        const salt = bcryptjs.genSaltSync();
        data.password = bcryptjs.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, data);

    res.json(user);
}

const usersDelete = async (req = request, res = response) => {
    const { id } = req.params;

    // Delete entirely from db
    const user = await User.findByIdAndDelete(id);

    // Change state
    // const user = await User.findByIdAndUpdate(id, { state: false });

    res.json(user);
}

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersDelete
}