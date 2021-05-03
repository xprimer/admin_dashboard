const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../../../models/user.model');


module.exports = new LocalStrategy({
    usernameField: 'txtUsername',
    passwordField: 'txtPassword',
},(username, password, done) => {
    User.findOne({username : username}, (err, user) => {
        if(err) {
            return done(err); 
        }
        if(!user) {
            return done(null, false, {messages : 'Username is not exists !'});
        }
        if(!user.validPassword(password)) {
            return done(null, false, {messages : 'Password is wrong !'});
        }
        return done(null, user);
    })
})
