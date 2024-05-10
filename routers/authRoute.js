const express = require('express');
const router = express.Router();
const {register, login, logout} = require('../controllers/authController');

router.route('/login')
    .post(login)
    .get((req,res) => { res.send("Hello login");
});

router.route('/register')
    .post(register)
    .get((req,res) => { res.send("Hello Register");
});

router.get('/logout', logout);

module.exports = router;