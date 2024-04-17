const userController = require('../controllers/userController');
const {upload} = require('../config/multerConfig');

const express = require('express');
const router = express.Router();

router.post('/register', upload.single('orgFile'), userController.create);
router.post('/login', upload.none(), userController.userLogin);

module.exports = router;