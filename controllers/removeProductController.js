const mysql = require('mysql2');
const connection = mysql.createPool(require('../middleware/config'));
const {resError} = require('../middleware/resError');
const fs = require('fs');
const path = require('path')

module.exports.removeProduct = (req, res) => {
    const {id, category, img_url} = req.query;
    const filePath = path.join(__dirname, '../uploads/' + img_url);
    fs.unlink(filePath, (err) => {
        if(err) throw err;
        else{
            console.log('success');
        }
    })
    connection.query(`DELETE FROM ${category} WHERE id = ?`, [+id], (err) => err ? resError(res, err):res.json({status: 'success'}));
}