const multer = require('multer');
const moment = require('moment');


const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename(req, file, cb) {
        cb(null, moment().format('DDMMYYYY-hhmmss') + file.originalname)
    }
})

const types = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp'];

const fileFilter = (req, file, cb) => {
    if(types.includes(file.mimetype)) {
        cb(null, true);
    }else{
        cb(null, false);
    }
}



module.exports = multer({storage, fileFilter})