const database = require('./database');

module.exports = {
    addCustomer: async function (req, res, next) {
        const qs = req.body;
        const name = qs.name;
        const phone = qs.phone;
        const email = qs.email;
        const country = qs.countryInputHtml;

        if (!name || name.length === 0) {
            throw ('ERROR: name is empty');
        }

        const sql = 
        "INSERT INTO customers(name, phone, email, country_id)" +
            " VALUES(?,?,?,?);";

        try {
            const result = await database.query(
                sql, 
                [name, phone, email, country]
            );
        }
        catch (err) {
            console.log(err);
            return;
        }

        res.send(`${name} added successfully`);
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
    deleteCustomer: async function(req, res, next) {

    },

    // todo: export all customers to file
    // sql: SELECT
    exportCustomers: async function(req, res, next) {
        const sql = "SELECT cust.name, cust.phone, cust.email, " +
            "cntr.name AS country_name FROM customers cust " +
            "LEFT JOIN countries cntr ON cust.country_id = cntr.id ORDER BY cust.name ASC;";
    },

    // todo: sort customers by column
    // sql: SORT BY ASC/DESC

    // todo: search in customers by parameter (name,email,country)
    // sql: SELECT WHERE
    findCustomer: async function(req, res, next) {},

    // todo: edit/update customer
    updateCustomer: async function(req, res, next) {},

    // todo: view more details of a customer
    viewCustomerDetails: async function(req, res, next) {},
}
