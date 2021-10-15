const User = require('../models/user.model');

const emailExists = async (email = '') => {
    const existsEmail = await User.findOne({ email });
    if (existsEmail) {
        throw new Error(`Email ${email} has already been used`);
    }
}

const existsUserById = async (id) => {
    const existsUser = await User.findById(id);
    if (!existsUser) {
        throw new Error(`ID ${id} does not exists`);
    }
}

module.exports = {
    emailExists,
    existsUserById
}