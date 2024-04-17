const userController = require('../controllers/userController');
const {upload} = require('../config/multerConfig');

const express = require('express');
const router = express.Router();

router.post('/register', upload.single('orgFile'), userController.create);
router.post('/login', upload.none(), userController.userLogin);
router.put('/editUser', upload.none(), userController.editUser);
router.put('/forgotPassword', upload.none(), userController.forgotPassword);

module.exports = router;