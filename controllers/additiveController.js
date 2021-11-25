const mysql = require('mysql2');
const {connEnd} = require("../middleware/connEnd");
const connection = mysql.createPool(require('../middleware/config'));
const {resError} = require('../middleware/resError');

module.exports.add_additive = (req, res) => {
    const {title, price} = req.body;
    let sql = "INSERT INTO additive (title, price, img_url) VALUES (?, ?, ?)"
    connection.query(sql, [title, price, req.file.filename], (err) => err ? resError(res, err) : res.json({status: 'success'}));
}

module.exports.get_additive = (req, res) => {
    connection.query("SELECT * FROM additive", (err, result) => {
        if (err) {
            resError(res, err)
        } else {
            res.status(200).json({
                status: 'success',
                additives: result
            })
        }
    })
}
module.exports.get_additives_using_id = (req, res) => {

    if(req.query.id){
        let id = JSON.parse(req.query.id);
        connection.query(`SELECT * FROM additive WHERE id IN(${id.join(',')})`, (err, result) => {
            if (err) {
                resError(res, err)
            } else {
                res.status(200).json({
                    status: 'success',
                    additives: result
                })
            }
        })
    }
}

module.exports.removeAdditive = (req, res) => {
    const {id} = req.query;
    connection.query("DELETE FROM additive WHERE id = ? ", [id], (err) => err ? resError(res, err) : res.json({status: 'success'}));
}

module.exports.get_additiveTitle = (req, res) => {
    connection.query("SELECT id, title FROM additive", (err, result) => {
        if (err) {
            resError(res, err)
        } else {
            res.status(200).json({
                status: 'success',
                additivesTitle: result
            })
        }
    })
}