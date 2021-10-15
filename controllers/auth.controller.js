const { response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user.model');

const { generateJWT } = require('../helpers/generate-jwt');

const login = async (req, res = response) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        // Email exists
        if (!user) {
            return res.status(400).json({
                msg: 'User/Password are incorrect - email'
            });
        }

        // User active
        if (!user.state) {
            return res.status(400).json({
                msg: 'User/Password are incorrect - state: false'
            });
        }

        // Verify password
        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'User/Password are incorrect - password'
            });
        }

        // Generate JWT
        const token = await generateJWT(user.id);

        res.json({
            user,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Talk to server admin'
        });
    }
}

module.exports = {
    login
}