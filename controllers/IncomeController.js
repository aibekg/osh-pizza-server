const { json } = require("express");
const mysql = require("mysql2");
const { resError } = require("../middleware/resError");
let connection = mysql.createPool(require("../middleware/config"));

module.exports.getIncome = (req, res) => {
  connection.query("SELECT * FROM income", (err, rows) => {
    if (err) resError(res, err);
    res.json({
      status: "success",
      income: rows,
    });
  });
};
