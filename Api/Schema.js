const mongoose = require('mongoose');
const Schema = mongoose.Schema;



let User = new Schema({
    conversation: {
        type: String
    }
}, {
    collection: 'Userdata'
})

module.exports = mongoose.model('User', User)
