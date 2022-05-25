const joi = require('joi');
const database = require('./database');
const fileMgmt = require('../shared/fileMgmt');

module.exports = {
    addCustomer: async function (req, res, next) {
        const reqBody = req.body;

        const schema = joi.object({
            name: joi.string().required().min(2).max(200),
            phone: joi.string().required().regex(/^[0-9]\d{8,11}$/),
            email: joi.string().required().regex(/^[^@]+@[^@]+$/),
            countryInputHtml: joi.number().required(),
        });

        const { error, value } = schema.validate(reqBody);

        if (error) {
            (`error adding customer: ${error}`);
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
    //  const param = req.body; //  post method
        
        const schema = joi.object({
            column: joi.string().required(),
            sort: joi.string().required(),
        })
            //.or('name', 'email', 'country_id');

        const { error } = schema.validate(param);
        const column = (error) ? 'name' : param.column;
        const sort = (error) ? 'ASC' : param.sort;

        const sql = `SELECT cust.id, cust.name, cust.phone, cust.email, ` +
            `cntr.id AS country_id, cntr.name AS country_name, cntr.country_code FROM customers cust ` +
            `LEFT JOIN countries cntr ON cust.country_id = cntr.id ORDER BY cust.${column} ${sort};`;

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

    // todo: sort customers by column
    // sql: SORT BY ASC/DESC

    // todo: search in customers by parameter (name,email,country)
    // sql: SELECT WHERE
    findCustomer: async function (req, res, next) { },

    // todo: edit/update customer
    updateCustomer: async function (req, res, next) { },

    // todo: view more details of a customer
    viewCustomerDetails: async function (req, res, next) { },
}
