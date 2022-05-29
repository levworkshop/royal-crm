const express = require('express');
const router = express.Router();
const pm = require('../controllers/products');
const fileMgmt = require('../shared/fileMgmt');

// http://localhost:300/products

router.get('/home', function (req, res, next) {
    const filePath = fileMgmt.getHtmlFilePath('products-home.html');
    res.sendFile(filePath);
});

router.get('/', pm.productsList);
router.post('/', pm.addProduct);
router.get('/export', pm.exportProducts);
// router.patch('/products', pm.editProduct);
// router.delete('/', pm.deleteProduct);
// router.get('/search/:id', pm.searchProducts);

module.exports = router;
