const adminController = require('../controllers/adminController');
const {upload} = require('../config/multerConfig');

const express = require('express');
const router = express.Router();

router.get('/getAll', upload.none(), adminController.getAllOrgUsers);
router.put('/verfication', upload.none(), adminController.verfication);

module.exports = router;