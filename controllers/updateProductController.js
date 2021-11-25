const mysql = require('mysql2');
const connection = mysql.createPool(require('../middleware/config'));
const {resError} = require('../middleware/resError');

module.exports.updatePizza = (req, res) => {
    const {title, composition, discount, active, id} = req.body;
    let  discountP = JSON.parse(discount);
    if(req.file){
        let sql = "UPDATE pizza SET title = ?,img_url = ?, compositions = ?, discount = ?, active = ? WHERE id = ?"
        connection.query(sql, [title, req.file.filename, composition, discountP, active, id], (err) => {
            err ? resError(res, err): res.json({status: 'success'})
        })
    }else{
        let sql = "UPDATE pizza SET title = ?, compositions = ?, discount = ?, active = ? WHERE id = ?"
        connection.query(sql, [title, composition, discountP, active, id], (err) => {
            err ? resError(res, err): res.json({status: 'success'})
        })
    }
}

module.exports.updateDrink = (req, res) => {
    const {title, active, discount, id} = req.body;
    const discountP = JSON.parse(discount);
    let sql = "UPDATE drinks SET title = ?, discount = ?, active = ? WHERE id = ?";
    connection.query(sql, [title, discountP, active, id], (err) => err ? resError(res, err): res.json({status: 'success'}))
}
module.exports.updateSnack = (req, res) => {
    const {title, id, discount, description, active} = req.body;
    let sql = "UPDATE snacks SET title = ?, active = ?, description = ?, discount = ? WHERE id = ?";
    connection.query(sql, [title, active, description, discount, id], (err) => err ? resError(res, err): res.json({status:'success'}) )
}

module.exports.updateCombo = (req, res) => {
    const {title, id, discount, description, active} = req.body;
    let sql = "UPDATE combo SET title = ?, active = ?, description = ?, discount = ? WHERE id = ?";
    connection.query(sql, [title, active, description, discount, id], (err) => err ? resError(res, err): res.json({status:'success'}) )
}