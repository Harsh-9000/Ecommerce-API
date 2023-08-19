const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post('/register', async (req, res) => {
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, process.env.SECRET),
        phone: req.body.phone,
        address: req.body.address,
        isAdmin: req.body.isAdmin
    });

    user = await user.save();

    if (!user) {
        return res.status(400).send('The user was not created.');
    }

    res.send(user);
});

router.post('/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return res.status(400).send("User Not Found");
    }

    if (user && bcrypt.compareSync(req.body.password, user.password)) {
        const token = jwt.sign(
            {
                userId: user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1d'
            }
        );
        res.status(200).send({ user: user.email, token: token });
    } else {
        res.status(400).send('Password is Wrong');
    }
});

module.exports = router;