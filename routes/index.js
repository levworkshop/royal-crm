const express = require('express');
const router = express.Router();
const customersModule = require('../controllers/customers');
const productsModule = require('../controllers/products');
const ordersModule = require('../controllers/orders');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send('this is the home page. use /customers /products or /orders.')
});

/* customers */
router.get('/customers', function (req, res, next) {
  // customersModule.addCustomer('Lola', '05233333', 'hi@gmail.com', 1);
  customersModule.customersList(req, res);
});

/* products */
router.get('/products', function (req, res, next) {
  // productsModule.addProduct('Good Product', 'A very good product', 50);
  productsModule.productsList(req, res);
});

/* orders */
router.get('/orders', function (req, res, next) {

  ordersModule.ordersList(req, res);
});

module.exports = router;
