const joi = require('joi');
const database = require('./database');
const fileMgmt = require('../shared/fileMgmt');

module.exports = {
    addProduct: async function (req, res, next) {
        const reqBody = req.body;

        const schema = joi.object({
            name: joi.string().required().min(2).max(100),
            description: joi.string().required().min(2).max(300),
            price: joi.number().required(),
        });

        const { error, value } = schema.validate(reqBody);

        if (error) {
            res.send(`error adding product: ${error}`);
            return;
        }

        const sql = "INSERT INTO products(name, description, price)" +
            " VALUES(?,?,?);";

        try {
            const result = await database.query(
                sql,
                [
                    reqBody.name,
                    reqBody.description,
                    reqBody.price,
                ]
            );
        }
        catch (err) {
            console.log(err);
            return;
        }

        res.send(`${reqBody.name} added successfully`);
    },

    productsList: async function (req, res, next) {
        /*
        1. [V] add fields in the products html
        2. [V] get the parameters from the request
        3. [V] validate parameters using joi
        4. [V] if validation fail - return error
        6. [V] update sql query with parameters
        */
        
        const param = req.query;

        const schema = joi.object({
            column: joi.string().valid('name', 'price').default('name'),
            sort: joi.string().valid('ASC', 'DESC').default('ASC'),
        });

        const { error, value } = schema.validate(param);

        if (error) {
            // console.log(error);
            res.status(400).send('add failed');
            throw error;
        }

        const sql = `SELECT * FROM products ORDER BY products.${value.column} ${value.sort};`;

        try {
            const result = await database.query(sql);
            res.send(result[0]);
        }
        catch (err) {
            console.log(err);
        }
    },

    // todo: search product by name
    exportProducts: function (req, res, next) {
        const sql = "SELECT name,description,price FROM products ORDER BY name ASC;";
        fileMgmt.exportToFile(res, sql, 'products');
    },

    // todo: edit product details
    editProduct: async function (req, res, next) {
        const reqBody = req.body;

        const schema = joi.object({
            name: joi.string().min(2).max(100),
            description: joi.string().min(2).max(300),
            price: joi.number(),
            image: joi.string().min(5).max(200),
        }).min(1);

        const { error, value } = schema.validate(reqBody);

        if (error) {
            res.status(400).send(`error update product: ${error}`);
            return;
        }
        /*
        {
            name: 'aaa',
            price: 15,
        }
        */

        const keys = Object.keys(value);   // ['name','price']
        const values = Object.values(value); // ['aaa', 15]
        // const fields = keys.map(key => `${key}=?`); // ['name=?','price=?']
        // const parseFileds = fields.join(','); // 'name=?,price=?'
        const fields = keys.map(key => `${key}=?`).join(',');
        values.push(req.params.id);
        const sql = `UPDATE products SET ${fields} WHERE id=?`;

        try {
            const result = await database.query(sql, values);
            res.json(value);
        }
        catch (err) {
            console.log(err);
            return;
        }

        
    },

    // todo: delete product
    deleteProduct: async function (req, res, next) {

        // get client id that we want to delete
        // validate: number not null
        // const sql = DELETE
        // return details of deleted product

        const schema = joi.object({
            id: joi.number().required()
        });

        const { error, value } = schema.validate(req.params);

        if (error) {
            res.status(400).send('error delete product');
            console.log(error.details[0].message);
            return;
        }

        const sql = `DELETE FROM products WHERE id=?`;

        try {
            const result = await database.query(sql, [value.id]);
            res.json({
                id: value.id
            });
        }
        catch (err) {
            res.status(400).send('error delete product');
            console.log(err.message);
        }
    },

    // todo: search product by name
    searchProducts: async function (req, res, next) {
        // const sql = SELECT WHERE...
        res.send('todo search products');
    },

    // todo: sort products by name...
}
