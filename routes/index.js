const express = require('express');
const router = express.Router();
const pm = require('../controllers/products');
const ordersModule = require('../controllers/orders');
const path = require('path');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send('this is the home page. use /customers/home /products/home or /orders/home.')
});

router.get('/chat', function (req, res, next) {
  const filePath = path.join(__dirname, '../client', 'chat.html');
  res.sendFile(filePath);
});

/* products */
router.get('/products-home', function (req, res, next) {
  const filePath = path.join(__dirname, '../client', 'products-home.html');
  res.sendFile(filePath);
})
router.get('/products', pm.productsList);
router.post('/products', pm.addProduct);
router.get('/products/export', pm.exportProducts);
// router.patch('/products', pm.editProduct);
// router.delete('/products', pm.deleteProduct);
// router.get('/products/search/:id', pm.searchProducts);

/* orders */
router.get('/orders', ordersModule.ordersList);

module.exports = router;