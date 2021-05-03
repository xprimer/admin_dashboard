const express = require('express');
const router = express.Router();
const passport = require('passport');
// Controller
const UserController = require('../../controllers/user.controller');

// router.post('/login',passport.authenticate('local', {failureFlash: true, successFlash: true}));
router.get('/register', (req,res) => {
    return res.json({
        status: 'check',
    })
})
router.post('/register',UserController.createNewUSer
);


module.exports = router;