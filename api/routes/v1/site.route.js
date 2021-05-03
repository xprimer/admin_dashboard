const express = require('express');
const router = express.Router();
// Middlewares
const checkAuthenMdw = require('../../middlewares/checkAuthen');
// Controllers
const UserController = require('../../controllers/user.controller');


router.get('/authenticate', (req,res) => {
    // if(req.isAuthenticated()){
    //     return res.status(200).json({
    //         status: 'success',
    //         data : [],
    //         messages : 'Request is authenticated !'
    //     });
    // };
    return res.status(400).json({
        status: 'error',
        data : [],
        messages : 'Request is not authenticated !'
    })
})
router.post('/register',  UserController.createNewUSer );

module.exports = router;
