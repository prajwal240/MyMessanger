const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {
        type: String
    }, email: {
        type: String,
        unique: true
    }, password: {
        type: String
    }, pic: {
        data: Buffer,
        name: String
    }
});

const Userdata = mongoose.model('userdatas', schema);

module.exports = { Userdata };
