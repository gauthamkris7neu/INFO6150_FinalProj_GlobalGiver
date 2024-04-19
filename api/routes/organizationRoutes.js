const organizationController = require('../controllers/organizationController');
const {upload} = require('../config/multerConfig');

const express = require('express');
const router = express.Router();

router.post('/create', upload.single('eventImage'), organizationController.createEvent);
router.get('/getAll', upload.none(), organizationController.getAllEvents);
router.put('/edit', upload.none(), organizationController.editEvent);
router.delete('/delete', upload.none(), organizationController.closeEvent);

module.exports = router;