const User = require('../models/user');

exports.getLinks = function(req, res, next) {
    console.log('inside getlinks');
    User.findById(req.userId, 'links')
        .populate('links')
        .exec((err, user) => {
            if (err) {
                next(err);
            } 
            else {
                res.status(200).json({ links: user.links });
            }
        });
}