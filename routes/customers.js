const express = require('express');
const router = express.Router();
const path = require('path');
const cm = require('../controllers/customers');

router.get('/cusomters/home', function (req, res, next) {
    const filePath = path.join(__dirname, '../client', 'customers-home.html');
    res.sendFile(filePath);
});

router.get   ('/customers', cm.customersList);
router.get   ('/customers/detailes', cm.viewCustomerDetails);
router.get   ('/customers/export', cm.exportCustomers);
router.patch ('/customers', cm.updateCustomer);
router.post  ('/customers', cm.addCustomer);
router.delete('/customers', cm.deleteCustomer);

module.exports = router;