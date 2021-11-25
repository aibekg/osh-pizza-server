module.exports.ensureToken = (req, res, next) => {
    const BearerHeader = req.headers['authorization'];
    if(typeof BearerHeader !== 'undefined') {
        const bearer = BearerHeader.split(' ')[1];
        req.token = bearer;
        next()
    }else{
        res.status(403);
    }
}