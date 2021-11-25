const mysql = require('mysql2');
const connection = mysql.createPool(require('../middleware/config'));
const {resError} = require('../middleware/resError');

module.exports.getProducts = (req, res) => {
    const {category}= req.query ;
    connection.query(`SELECT * FROM ${category}`, (err, rows) => {
        if(err)resError(res, err);
        else{
            res.status(200).json({
                status:'success',
                products: rows
            })
        }
    })
}

module.exports.searchProductsByTitle = (req, res) => {
    const {title, category} = req.query
        let sql = `SELECT id, title, img_url, price, active FROM ${category} WHERE title LIKE ?`;
        connection.query(sql, '%' + title + '%',(err, rows) => {
            if(err){
                resError(res, err);
            }else{
                res.status(200).json({
                    status: 'success',
                    products: rows
                })
            }
        })
}
module.exports.get_product_by_id = (req, res) => {
    const {id, category} = req.query;
    connection.query(`SELECT * FROM ${category} WHERE id = ?`, [+id], (err, rows) => {
        if(err) {
            resError(res, err);
        }else {
            res.status(200).json({
                status: 'success',
                product: rows
            })
        }
    })
}

module.exports.get_banner = (req, res) => {
    connection.query("SELECT * FROM banner", (err, rows) => {
        if(err){
            resError(res, err);
        }else{
            res.json({
                status:'success',
                imgs: rows
            })
        }
    })
}