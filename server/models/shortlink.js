const mongoose = require('mongoose')

const Schema = mongoose.Schema;

function url_format_validator(url) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return pattern.test(url);
}

/* function url_online_validator(url) {
    return new Promise(function(resolve, reject) { // Async validator
        var request = new XMLHttpRequest();
        request.open('GET', url, false);
        request.send();
        resolve(request.status === 0 || request.status === 200);
    }); 
} */

const url_validators = [
    { validator: url_format_validator, msg: 'Bad URL format' },
    /* { validator: url_online_validator, msg: 'The URL is not online' } */
]

const shortLinkSchema = new Schema({
    original_link: {
        type: String,
        validate: url_validators,
        index: true,
        unique: true
    },
    short_id: {
        type: String,
        index: true,
        unique: true
    },
    counter: {
        type: Number, 
        default: 1
    }
})

module.exports = mongoose.model('ShortLink', shortLinkSchema);