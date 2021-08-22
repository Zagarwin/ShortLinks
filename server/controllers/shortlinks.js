
const ShortLink = require('../models/shortlink');
const User = require('../models/user');

const randomstring = require('randomstring');

function generateId() {
    return randomstring.generate(7);
}

function addUserLink(userId, link, callback) {
    if (userId == null) return callback();
    User.findByIdAndUpdate(
        userId,
        { $addToSet: { links: link } },
        callback
    );
}

exports.redirect = function(req, res) {
    var shortId = req.params.shortId;
    ShortLink.findOne({ short_id: shortId }, function(err, link) {
        if (err) return console.error(err);
        res.json({ original_link: link.original_link });
    });
}

exports.increment = function(req, res, next) {
    ShortLink.findOneAndUpdate(
        { original_link: req.body.url },
        { $inc: { counter: 1 } },
        (err, doc) => {
            if (err) {
                next(err); // TODO : handle verificatios errors
            }
            else if (doc) {
                addUserLink(req.userId, doc, (err) => {
                    if (err) next(err);
                    else res.json({ short_id: doc.short_id });
                });
            }
            else {
                next();
            }
        }
    );
}

exports.create = function(req, res, next) {
    newLink = ShortLink({ 
        original_link: req.body.url,
        short_id: generateId()
    });
    newLink.save((err, doc) => {
        if (err) { // TODO : properly handle eventual existence (unlikely af)
            next(err); 
        }
        else {
            addUserLink(req.userId, doc, (err) => {
                if (err) next(err);
                else res.json({ short_id: doc.short_id });
            });
        }
    });
}