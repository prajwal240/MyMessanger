const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    sender: {
        type: String,
        required:true
    }, reciever: {
        type: String,
        required:true
    }, msg: {
        type: String,
        required:true
    }
}, { timestamps: true });

const Message = mongoose.model('messagedatas', schema);

module.exports = { Message };