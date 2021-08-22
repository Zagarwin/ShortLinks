const User = require('../models/user');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.create = function(req, res, next) {
    newUser = User({
        name: req.body.name,
        password: req.body.password
    });
    newUser.save((err, doc) => {
        if (err) {
            next(err);
        }
        else {
            res.json({
                status: "success",
                message: "user added successfully",
                data: null
            });
        }
    });
}

exports.authenticate = function(req, res, next) {
    User.findOne({ name: req.body.name },
        (err, doc) => {
            if (err) {
                next(err);
            }
            else {
                if (bcrypt.compareSync(req.body.password, doc.password)) {
                    const token = jwt.sign(
                        { id: doc._id },
                        req.app.get('secretKey'),
                        { expiresIn: '1h' }
                    );
                    res.json({
                        status: "success",
                        message: "user found",
                        data: {
                            user: doc,
                            token: token
                        }
                    });
                }
                else {
                    res.json({
                        status: "error",
                        message: "invalid credentials",
                        data: null
                    });
                }
            }
        }
    );
}