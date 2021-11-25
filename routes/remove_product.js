const express = require('express');
const router  = express.Router();
const controller = require('../controllers/removeProductController');

router.delete('/', controller.removeProduct);

module.exports = router;
