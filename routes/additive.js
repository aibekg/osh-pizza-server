const express = require('express');
const router = express.Router();
const fileMiddleWare = require('../middleware/upload');
const controller = require('../controllers/additiveController')

router.post('/add_additive', fileMiddleWare.single('img_url'), controller.add_additive);
router.get('/get_additive', controller.get_additive);
router.get('/get_additives_using_id', controller.get_additives_using_id)
router.get('/get_additive_title', controller.get_additiveTitle);
router.delete('/remove_additive', controller.removeAdditive);


module.exports = router;