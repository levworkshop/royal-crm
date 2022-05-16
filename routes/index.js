const express = require('express');
const router = express.Router();
const cm = require('../controllers/customers');
const pm = require('../controllers/products');
const ordersModule = require('../controllers/orders');
const path = require('path');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send('this is the home page. use /customers /products or /orders.')
});

/* customers */
router.get('/cusomters-home', function (req, res, next) {
  const filePath = path.join(__dirname, '../client', 'customers-home.html');
  res.sendFile(filePath);
})

router.get('/customers', cm.customersList);
router.post('/customers', cm.addCustomer);

// todo: delete customer
router.delete('/customers', cm.deleteCustomer);

// todo: export all customers to file
router.get('/customers/export', cm.exportCustomers);

// todo: edit/update customer
router.patch('/customers', cm.updateCustomer);

// todo: view more details of a customer
router.get('/customer-detailes', cm.viewCustomerDetails);


/* products */
router.get('/products-home', function (req, res, next) {
  const filePath = path.join(__dirname, '../client', 'products-home.html');
  res.sendFile(filePath);
})
router.get('/products', pm.productsList);
router.post('/products', pm.addProduct);
router.get('/products/export', pm.exportProducts);
router.patch('/products', pm.editProduct);
router.delete('/products', pm.deleteProduct);
router.get('/products/search/:id', pm.searchProducts);



/* orders */
router.get('/orders', ordersModule.ordersList);

module.exports = router;