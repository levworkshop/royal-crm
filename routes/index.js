const express = require('express');
const router = express.Router();
const customersModule = require('../controllers/customers');
const productsModule = require('../controllers/products');

/* GET home page. */
router.get('/', function (req, res, next) {
  customersModule.addCustomer('Lola', '05233333', 'hi@gmail.com', 1);
  customersModule.customersList(req, res);
});

router.get('/products', function (req, res, next) {
  productsModule.addProduct('Good Product', 'A very good product', 50);
  productsModule.productsList(req, res);
});

module.exports = router;
