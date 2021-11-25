const mysql = require('mysql2');
const {resError} = require("../middleware/resError");
const connection = mysql.createPool(require('../middleware/config'));

module.exports.AddStock = (req, res) => {
    const {title, description} = req.body;
    if(title && description){
        let sql = "INSERT INTO stocks (title, description, img_url)  VALUES (?, ?, ?)";
        connection.query(sql, [title, description, req.file.filename], (err) => {
            if(err)resError(res, err);
            res.json({
                status: 'success'
            })
        })
    }
}
module.exports.getStocks = (req, res) => {
    connection.query('SELECT * FROM stocks', (err, rows) => {
        if(err)resError(res, err);
        res.json({
            status: 'success',
            stocks: rows
        })
    })
}
module.exports.removeStock = (req, res) => {
    const {id} = req.query;
    if(id) {
        connection.query("DELETE FROM stocks WHERE id = ?", [id], (err) => {
            if(err)resError(res, err);
            res.json({
                status : 'success'
            })
        })
    }
}
// -------------------------- TODO GET_STOCK_PHOTOS ---------------------------
module.exports.getStocksPhoto = (req, res) => {
    connection.query("SELECT id, img_url FROM stocks", (err, results) => {
        if(err) resError(res, err);
        res.json({
            status: 'success',
            photos: results
        })
    })
}