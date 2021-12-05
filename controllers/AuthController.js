const mysql = require('mysql2');
const axios = require("axios");
const xmlParser = require('xml-parse')
const {resError} = require("../middleware/resError");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../middleware/keys')
const {json} = require("express");



const connection = mysql.createPool(require('../middleware/config'));

module.exports.getMessage = (req, res) => {
    const phone_number = req.body.phone_number;
    // const random_code = Math.floor((Math.random() * 10000) + 1);
    const random_code = 1234;
    console.log(phone_number)
    const hashRandomCode = bcrypt.hashSync(`${random_code}`, 7);
    let xml = '<?xml version="1.0" encoding="UTF-8"?>' +
        '<message>' +
        '<login>Baha</login>' +
        '<pwd>JAGJracV</pwd>' +
        '<sender>SMSPRO.KG</sender>' +
        `<text>${random_code}</text>` +
        '<phones>' +
        `<phone>${phone_number}</phone>` +
        '</phones>' +
        '</message>'

    // const a = axios.post('https://smspro.nikita.kg/api/message', xml, {
    //     'Content-Type': 'application/xml',
    // });
    // a.then(({data}) => {
    //     let status = xmlParser.parse(xmlParser.parse(data)[1].innerXML)[0].innerXML;
    //     console.log(status)
    //     if(status === '0'){
    //         res.json({
    //             status: 'success',
    //             random_code: 1234
    //         })
    //     }else if(status === '7') {
    //         res.json({status: 'incorrect_phone_number'})
    //     }
    // })
    console.log(random_code);
    res.json({
        status: 'success',
        hashCode: hashRandomCode,
    })
}

module.exports.pinVerification = (req, res) => {
    let {hashCode,  pinCode, phone_number} = req.body;
    const result = bcrypt.compareSync(pinCode, hashCode);
    const token = jwt.sign({phone_number}, keys.jwt, {expiresIn: '365d'});

    if(result) {
        res.json({
            status: 'matches',
            token
        });
    } else {
        res.json({status: 'do_not_match'});
    }
}

module.exports.addUser = (req, res) => {
    const {name, phone_number, address, ordered, price_of_all_orders} = req.body;
    let addressL = JSON.stringify(address);
    connection.query('SELECT COUNT(*) AS count FROM users WHERE phone_number = ?', [phone_number], (err, result) => {
        if(err) resError(res, err)
        if(result[0].count > 0) {
            let sql = "UPDATE users SET name = ?, phone_number = ?, address = ?, ordered = ?, price_of_all_orders = ? WHERE phone_number = ?"
            connection.query(sql, [name, phone_number, addressL, ordered, price_of_all_orders, phone_number], (err, result) => {
                if(err) resError(res, err)
                res.json({status: 'success'})
            });
        }else{
            let sql = "INSERT INTO users (name, phone_number, address, ordered, price_of_all_orders) VALUES (?, ?, ?, ?, ?)";
            connection.query(sql , [name, phone_number, addressL, ordered, price_of_all_orders], (err, result) => {
                if(err) resError(res, err);
                res.json({status: 'success'})
            })
        }
    })
}

module.exports.getUser = (req, res) => {
    const {phone_number}  = jwt.verify(req.token, keys.jwt);
    console.log(phone_number)
    if(phone_number === ''){
        res.json({status: 'user_is_not_found'})
    }else{
        let sql = "SELECT * FROM users WHERE phone_number = ?";
        connection.query(sql, [phone_number], (err, result) => {
            if(err) resError(res, err);
            res.json({
                status: 'success',
                user: result[0]
            })
        })
    }
};
module.exports.addUserForPhoneNumber = (req, res) => {
    const {phone_number} = req.body;
    connection.query('SELECT COUNT(*) AS count FROM users WHERE phone_number = ?',[phone_number], (err,result) => {
        if(err) resError(res, err)
        if(result[0].count > 0) {
            res.json({
                status: 'success'
            })
        }else{
            let sql = "INSERT INTO users (phone_number) VALUES (?)";
            connection.query(sql, [phone_number], (err) => {
                if(err) resError(res, err);
                res.json({
                    status: 'success'
                })
            })
        }
    })
}

module.exports.updateUser = (req, res) => {
    const {name, email,  id} = req.body;
    let sql = "UPDATE users SET name = ?, email = ? WHERE id = ?";
    connection.query(sql, [name, email, id], (err) => {
        if(err) resError(res, err);
        res.json({
          status: 'success'
        })
    })
}