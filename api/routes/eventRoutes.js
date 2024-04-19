const eventController = require('../controllers/eventController');
const {upload} = require('../config/multerConfig');

const express = require('express');
const router = express.Router();

router.get('/getRegisteredEvents', upload.none(), eventController.getRegisteredEvents);
router.post('/register', upload.none(), eventController.registerUserForEvent);
router.post('/unregister', upload.none(), eventController.unregisterUserForEvent);
router.post('/:eventId/donate', upload.none(), eventController.userDonation);

module.exports = router;