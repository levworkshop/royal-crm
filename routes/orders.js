const express = require('express');
const router = express.Router();
const om = require('../controllers/orders');
const fileMgmt = require('../shared/fileMgmt');

router.get('/home', function (req, res, next) {
    const filePath = fileMgmt.getHtmlFilePath('orders-home.html');
    res.sendFile(filePath);
});

router.get('/', om.ordersList);
router.get('/export', om.exportOrders);

module.exports = router;