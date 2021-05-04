const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const passport = require('passport');

const user = new Schema({
    username : {type: String, require: true, unique: true},
    password : String,
    email : String
}, {timestamps : true});


const userModel = mongoose.model('user', user, 'user');


user.methods.validPassword = async (password) => {
    const u = this;
    const check = await bcrypt.compare(password, u.password);
    console.log(check);
    return check;
}

module.exports = userModel;
