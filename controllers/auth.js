const jwt = require('jsonwebtoken');
const config = require('../config/dev');
const joi = require('joi');
const database = require('./database');
const bcrypt = require('bcrypt');

module.exports = {
    login: async function (req, res, next) {
        const reqBody = req.body;

        const schema = joi.object({
            email: joi.string().required().min(6).max(255).email(),
            password: joi.string().required().min(6),
        });

        const { error, value } = schema.validate(reqBody);

        if (error) {
            console.log(error.details[0].message);
            res.status(401).send('Unauthorized');
            return;
        }

        const sql = 'SELECT * FROM users WHERE email=?;';

        try {
            const result = await database.query(sql, [value.email]);
            const user = result[0][0];
            const validPassword = await bcrypt.compare(value.password, user.password_hash);
            if (!validPassword) throw 'Invalid password';

            const param = { email: value.email };
            const token = jwt.sign(param, config.JWT_SECRET, { expiresIn: '72800s' });

            res.json({
                token: token,
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email
            });
        }
        catch (err) {
            console.log(`Error: ${err}`);
            res.status(401).send('Unauthorized');
            return;
        }
    },

    registerUser: async function (req, res, next) {
        const schema = joi.object({
            first_name: joi.string().required().min(2).max(50),
            last_name: joi.string().required().min(2).max(50),
            email: joi.string().required().email().min(6).max(255),
            password: joi.string().required().min(6).max(32),
        });

        const { error, value } = schema.validate(req.body);

        if (error) {
            console.log(error.details[0].message);
            res.status(400).send('error sign up new user');
            return;
        }

        const sql = `INSERT INTO users(first_name, last_name, email, password_hash) VALUES(?,?,?,?)`;

        try {
            const hash = await bcrypt.hash(value.password, 10);
            const result = await database.query(sql, [
                value.first_name,
                value.last_name,
                value.email,
                hash
            ]);

            res.json({
                id: result[0].insertId,
                first_name: value.first_name,
                last_name: value.last_name,
                email: value.email
            })
        }
        catch (err) {
            console.log(err.message);
            res.status(400).send('error sign up new user');
        }
    }
}
