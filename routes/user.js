const express = require('express');
const router = express.Router();
const controller = require('../controllers/usersController');

router.get('/get_users', controller.getUser);

module.exports = router;