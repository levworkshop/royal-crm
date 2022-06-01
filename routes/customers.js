const express = require('express');
const router = express.Router();
const cm = require('../controllers/customers');
const fileMgmt = require('../shared/fileMgmt');

// http://localhost:3000/customers

router.get('/home', function (req, res, next) {
    const filePath = fileMgmt.getHtmlFilePath('customers-home.html');
    res.sendFile(filePath);
});

// http://localhost:3000/customers/details/2
router.get('/details/:id', function (req, res, next) {
    const filePath = fileMgmt.getHtmlFilePath('customer-details.html');
    res.sendFile(filePath);
});

router.get('/', cm.customersList);
router.get('/find', cm.findCustomer);
// router.get   ('/details', cm.viewCustomerDetails);
router.get   ('/export', cm.exportCustomers);
// router.patch ('/', cm.updateCustomer);
router.post  ('/', cm.addCustomer);
// router.delete('/', cm.deleteCustomer);

module.exports = router;
