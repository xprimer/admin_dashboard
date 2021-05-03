const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const contact = require('./contact.model');

const event = new Schema({
    contactId : {
        type: mongoose.Schema.Types.ObjectId,
        ref : contact,
        require: true,
    },
    time : Date,
    place : String,
    subject : String,
    note : String,

}, {timestamps: true});

module.exports = mongoose.model('event', event, 'event');
