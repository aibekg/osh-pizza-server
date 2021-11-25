const express = require('express');
const router = express.Router();
const controller = require('../controllers/addProductController')
const fileMiddleWare = require('../middleware/upload');

router.post('/pizza',fileMiddleWare.single('img_url'), controller.add_pizza);
router.post('/drink',fileMiddleWare.single('img_url'), controller.add_drink);
router.post('/snack',fileMiddleWare.single('img_url'), controller.add_snack);
router.post('/banner', fileMiddleWare.single('img_url'), controller.add_banner);
router.post('/combo', fileMiddleWare.single('img_url'), controller.add_combo);


module.exports = router