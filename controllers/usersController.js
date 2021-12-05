const mysql = require('mysql2');
const connection = mysql.createPool(require('../middleware/config'));
const {resError} = require('../middleware/resError');

module.exports.getUser = (req, res) => {
    connection.query('SELECT * FROM users', (err, result) => {
        if(err) resError(res, err)
        res.json({
            status: 'success',
            users: result
        })
    })
}