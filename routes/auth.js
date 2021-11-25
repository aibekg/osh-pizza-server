const express = require('express');
const router = express.Router();
const middleWare = require('../middleware/upload');
const controller = require('../controllers/AuthController')
const {ensureToken} = require("../middleware/token");


router.post('/phone_number', controller.getMessage );
router.post('/verification_code', controller.pinVerification);
router.post('/add_user', controller.addUser);
router.get('/get_user',ensureToken , controller.getUser);
router.post('/add_user_for_phone_number', controller.addUserForPhoneNumber);
router.post('/update_user', controller.updateUser)

module.exports = router;