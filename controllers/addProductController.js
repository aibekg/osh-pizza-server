const mysql = require('mysql2');
const connection = mysql.createPool(require('../middleware/config'));
const {resError} = require('../middleware/resError');

module.exports.add_pizza = (req, res) =>  {
    const {title, price,additives, compositions } = req.body;
    let sql = "INSERT INTO pizza (title, img_url, price, additives, compositions) VALUES(?, ?, ?, ?, ?)";
    connection.query(sql, [title, req.file.filename, price, additives, compositions ], (err) => err ? resError(res, err): res.status(200).json({status:'success'}));
}

module.exports.add_drink = (req, res) => {
    const {title, price, volume } = req.body;
    let sql = "INSERT INTO drinks (title, img_url, price, volume) VALUES(?, ?, ?, ?)";
    connection.query(sql, [title, req.file.filename, price, volume], (err) => err ? resError(res, err): res.status(200).json({status:'success'}));
}

module.exports.add_snack = (req, res) =>  {
    const {title, price, description } = req.body;
    let sql = "INSERT INTO snacks (title, img_url, price, description) VALUES(?, ?, ?, ?)";
    connection.query(sql, [title, req.file.filename, price, description], (err) => err ? resError(res, err): res.status(200).json({status:'success'}));
}

module.exports.add_banner = (req, res) => {
    connection.query("INSERT INTO banner (img_url) VALUES(?)", [req.file.filename], (err) => {
        err ? resError(res, err) : res.json({status: 'success'})
    })
};

module.exports.add_combo = (req, res) => {
    const {title, price, description} = req.body;
    let sql = "INSERT INTO combo (title, img_url, description, price) VALUES (?, ?, ?, ?)";
    connection.query(sql, [title, req.file.filename, description, price], (err) => {
        if(err) resError(res, err);
        res.json({
            status: 'success'
        })
    })
}