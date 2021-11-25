const express = require('express');
const router = express.Router();
const controller = require('../controllers/getProductsController');


router.get('/', controller.getProducts );
router.get('/search', controller.searchProductsByTitle);
router.get('/id', controller.get_product_by_id);
router.get('/banner', controller.get_banner)

module.exports = router;