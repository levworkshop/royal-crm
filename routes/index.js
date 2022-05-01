const express = require('express');
const router = express.Router();
const customersModule = require('../controllers/customers');

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.send('hello again');
  customersModule.addCustomer('Lola', '05233333', 'hi@gmail.com', 1);
  customersModule.customersList(req, res);
});

module.exports = router;
