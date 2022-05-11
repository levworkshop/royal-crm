const express = require('express');
const router = express.Router();
const cm = require('../controllers/customers');
const productsModule = require('../controllers/products');
const ordersModule = require('../controllers/orders');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send('this is the home page. use /customers /products or /orders.')
});

/* customers */
router.get('/customers', cm.customersList);
router.get('/customers-add', cm.addCustomer);

// todo: delete customer
router.delete('/customers', cm.deleteCustomer);

// todo: export all customers to file
router.get('/customers-export', cm.exportCustomers);

// todo: edit/update customer
router.patch('/customers', cm.updateCustomer);

// todo: view more details of a customer
router.get('/customer-detailes', cm.viewCustomerDetails);


/* products */
router.get('/products', productsModule.productsList);

/* orders */
router.get('/orders', ordersModule.ordersList);

module.exports = router;