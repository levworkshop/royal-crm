const express = require('express');
const router = express.Router();
const path = require('path');
const cm = require('../controllers/customers');

// http://localhost:3000/customers/home

router.get('/home', function (req, res, next) {
    const filePath = path.join(__dirname, '../client', 'customers-home.html');
    res.sendFile(filePath);
});

router.get   ('/', cm.customersList);
router.get   ('/details', cm.viewCustomerDetails);
router.get   ('/export', cm.exportCustomers);
router.patch ('/', cm.updateCustomer);
router.post  ('/', cm.addCustomer);
router.delete('/', cm.deleteCustomer);

module.exports = router;