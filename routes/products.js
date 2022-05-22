const express = require('express');
const router = express.Router();
const pm = require('../controllers/products');
const path = require('path');

// http://localhost:300/products/home

router.get('/home', function (req, res, next) {
    const filePath = path.join(__dirname, '../client', 'products-home.html');
    res.sendFile(filePath);
});

router.get('/', pm.productsList);
router.post('/', pm.addProduct);
router.get('/export', pm.exportProducts);
// router.patch('/products', pm.editProduct);
// router.delete('/products', pm.deleteProduct);
// router.get('/products/search/:id', pm.searchProducts);

module.exports = router;