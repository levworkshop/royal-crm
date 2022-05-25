const jwt = require('jsonwebtoken');
const config = require('../config/dev');

module.exports = (req, res, next) => {
    const token = req.cookies.access_token; // todo: use auth header instead
    if (!token) return res.status(401).send('Access denied. go to /signin');

    try {
        req.user = jwt.verify(token, config.JWT_SECRET);
        next();
    }
    catch (err) {
        console.log(err);
        res.status(401).send('Access denied. go to /signin');
    }
}