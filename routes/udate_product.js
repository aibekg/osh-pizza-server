const express = require('express');
const router = express.Router();
const controller = require('../controllers/updateProductController');
const fileMiddleWare = require('../middleware/upload');

router.post('/pizza', fileMiddleWare.single('img_url'), controller.updatePizza);
router.post('/drink', fileMiddleWare.single("img_url"), controller.updateDrink);
router.post('/snack', fileMiddleWare.single('img_url'), controller.updateSnack);
router.post('/combo', fileMiddleWare.single('img_url'), controller.updateCombo);

module.exports = router