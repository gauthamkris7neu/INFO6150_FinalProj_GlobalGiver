const userController = require('../controllers/userController');

const express = require('express');
const router = express.Router();


router.post('/login', userController.userLogin);

module.exports = router;