const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const saltRounds = 10;

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    links: [{
        type: Schema.Types.ObjectId,
        ref: 'ShortLink'
    }]
});

userSchema.pre('save', (next) => {
    this.password = bcrypt.hashSync(this.password, saltRounds);
    next();
});

module.exports = mongoose.model('User', userSchema);