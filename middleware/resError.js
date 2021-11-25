module.exports.resError = (res, err) => {
    console.log(err)
    return res.status(500).json({
        status:'error',
        message: err
    })
}