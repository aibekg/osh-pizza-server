const express = require("express");
const controller = require('../controllers/stockController')
const router = express.Router();
const fileMiddleWare = require('../middleware/upload')

router.post('/add_stock', fileMiddleWare.single('img'), controller.AddStock);
router.get('/get_stocks', controller.getStocks);
router.delete('/remove_stock', controller.removeStock);
router.get('/get_stocks_photo', controller.getStocksPhoto);
module.exports = router