const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user.model');


const contact = new Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    },
    name : {
        firstName : {type: String, require: true},
        lastName : {type: String, require: true}
    },
    info : {
        personalInfo : {
            phone: Number,
            address: String,
            age: Number,
            birthday : Date,
        },
        socialInfo : {
            email : String,
            facebook : String,
            instagram : String,
            skype : String,
            website : String
        }
    }
}, {timestamps: true});

module.exports = mongoose.model('contact', contact, 'contact');


