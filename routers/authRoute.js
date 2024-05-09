const express = require('express');
const router = express.Router();
const {registerUser, authenticateUser} = require('../controllers/authController');

router.route('/login')
    .post(authenticateUser)
    .get((req,res) => { res.send("Hello login");
});

router.route('/register')
    .post(registerUser)
    .get((req,res) => { res.send("Hello Register");
});


module.exports = router;