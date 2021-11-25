const express = require("express");
const router = express.Router();
const controller = require("../controllers/IncomeController");

router.get("/get_income", controller.getIncome);

module.exports = router;
