const express = require('express');
const router = express.Router();
const mwAuth = require('../middleware/auth');
const auth = require('../controllers/auth');
const fileMgmt = require('../shared/fileMgmt');

/* authentication */
router.get('/signin', function (req, res, next) {
  const filePath = fileMgmt.getHtmlFilePath('login.html');
  res.sendFile(filePath);
});

router.post('/login', auth.login);

router.get('/logout', mwAuth, function (req, res, next) {
  return res
    .clearCookie('access_token')
    .status(200)
    .send('Successfully logged out.');
})

/* home page */
router.get('/', mwAuth, function (req, res, next) {
  res.send('this is the home page. use /customers/home /products/home or /orders/home.')
});

/* chat */
router.get('/chat', mwAuth, function (req, res, next) {
  const filePath = fileMgmt.getHtmlFilePath('chat.html');
  res.sendFile(filePath);
});


module.exports = router;
