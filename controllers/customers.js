const joi = require('joi');
const database = require('./database');
const fileMgmt = require('../shared/fileMgmt');

module.exports = {
    addCustomer: async function (req, res, next) {
        const reqBody = req.body;

        const schema = joi.object({
            name: joi.string().required().min(2).max(200),
            phone: joi.string().required().regex(/^[0-9]{8,11}$/),
            email: joi.string().required().regex(/^[^@]+@[^@]+$/),
            countryInputHtml: joi.number().required(),
        });

        const { error, value } = schema.validate(reqBody);

        if (error) {
            res.send(`error adding customer: ${error}`);
            return;
        }

        const sql =
            "INSERT INTO customers(name, phone, email, country_id)" +
            " VALUES(?,?,?,?);";

        try {
            const result = await database.query(
                sql,
                [
                    reqBody.name,
                    reqBody.phone,
                    reqBody.email,
                    reqBody.countryInputHtml
                ]
            );
        }
        catch (err) {
            console.log(err);
            return;
        }

        res.send(`${reqBody.name} added successfully`);
    },

    customersList: async function (req, res, next) {
        const param = req.query; // get method
        //  const param = req.body;  // post method

        const schema = joi.object({
            column: joi.string().valid('name', 'email', 'country_name').default('name'),
            sort: joi.string().valid('ASC', 'DESC').default('ASC'),
        });

        const { error, value } = schema.validate(param);

        if (error) {
            console.log(error);
            res.status(400).send('add failed');
            return
        }

        const fieldsMap = new Map([
            ['name', 'customers.name'],
            ['email', 'customers.email'],
            ['country_name', 'countries.name'],
        ]);

        const sql = `SELECT customers.id, customers.name, customers.phone, customers.email,  
            countries.id AS country_id, countries.name AS country_name, countries.country_code  
            FROM customers LEFT JOIN countries ON customers.country_id = countries.id 
            ORDER BY ${fieldsMap.get(value.column)} ${value.sort};`;

        try {
            const result = await database.query(sql);
            res.send(result[0]);
        }
        catch (err) {
            console.log(err);
            res.send(err);
        }
    },

    exportCustomers: function (req, res, next) {
        const sql = "SELECT cust.name, cust.phone, cust.email, " +
            "cntr.name AS country_name FROM customers cust " +
            "LEFT JOIN countries cntr ON cust.country_id = cntr.id ORDER BY cust.name ASC;";

        fileMgmt.exportToFile(res, sql, 'customers');
    },

    // todo: search in customers by parameter (name,email,country)
    // sql: SELECT WHERE
    findCustomer: async function (req, res, next) {
        /*
        1. [V] client send request using html form
        2. the request is being send to a router 
            -[V] router maps the request to a function (controller),
            -[V] router uses READ -> GET API
        3. controller function:
            -[V] req.query -> parameters in the request from client
            -[V] use joi to validate req.query param (string, required, min 2 characters)
            -[V] error or success => manage error
            -[V] if success => add parameters into query
            -[V] send query to database and get results
            -[V] return response to client, display to user
        */

        const param = req.query;

        const schema = joi.object({
            search: joi.string().required().min(2)
        });

        const { error, value } = schema.validate(param);

        if (error) {
            res.status(400).send(`search error: ${error}`);
            throw error;
        }

        const searchQuery = `%${value.search}%`;

        const sql = `SELECT customers.id, customers.name, customers.phone, customers.email,   
            countries.id AS country_id, countries.name AS country_name, countries.country_code  
            FROM customers LEFT JOIN countries ON customers.country_id = countries.id 
            WHERE customers.name LIKE ? OR customers.email LIKE ? OR customers.country_id LIKE ? 
            ORDER BY customers.name ASC;`;

        try {
            const result = await database.query(
                sql,
                [
                    searchQuery,
                    searchQuery,
                    searchQuery,
                ]
            );
            
            res.send(result[0]);
        } catch (err) {
            res.status(400).send(`search error: ${err}`);
            throw error;
        }
    },

    // todo: edit/update customer
    updateCustomer: async function (req, res, next) { },

    // todo: view more details of a customer
    // viewCustomerDetails: async function (req, res, next) { },
}
