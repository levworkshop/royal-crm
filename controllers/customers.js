const database = require('./database');
const joi = require('joi');

module.exports = {
    addCustomer: async function (req, res, next) {
        const reqBody = req.body;

        const schema = joi.object({
            name: joi.string().required().min(2).max(200),
            phone: joi.string().required().regex(/^[0-9]\d{8,11}$/),
            email: joi.string().required(),
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
        const sql = "SELECT cust.id, cust.name, cust.phone, cust.email, " +
            "cntr.id AS country_id, cntr.name AS country_name, cntr.country_code FROM customers cust " +
            "LEFT JOIN countries cntr ON cust.country_id = cntr.id ORDER BY cust.name ASC;";

        try {
            // const connection = await database.getConnection();
            const result = await database.query(sql); // [rows, fields]
            res.send(result[0]);
        }
        catch (err) {
            console.log(err);
        }
    },

    // todo: delete customer
    // sql: DROP
    deleteCustomer: async function (req, res, next) {

    },

    // todo: export all customers to file
    // sql: SELECT
    exportCustomers: async function (req, res, next) {
        const sql = "SELECT cust.name, cust.phone, cust.email, " +
            "cntr.name AS country_name FROM customers cust " +
            "LEFT JOIN countries cntr ON cust.country_id = cntr.id ORDER BY cust.name ASC;";
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
