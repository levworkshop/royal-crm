const mysql = require('mysql2');
const config = require('../config/dev');

const pool = mysql.createPool({
    host: config.DB_HOST,
    user: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 5,
    queueLimit: 0
});

module.exports = {
    // list: [],

    addCustomer: function (name, phone, email, countryId) {
        // const name = process.argv.slice(2);

        if (!name || name.length === 0) {
            throw ('ERROR: name is empty');
        }

        // this.list.push({
        //     name: name,
        //     id: this.list.length,
        // });

        pool.getConnection(function (connErr, connection) {
            if (connErr) throw connErr; // not connected!

            // const sql = "INSERT INTO customers(name, phone, email, country_id)" +
            //     " VALUES('" + name + "','" + phone + "','" + email + "','" + countryId + "');";

            const sql = "INSERT INTO customers(name, phone, email, country_id)" +
                " VALUES(?,?,?,?);";

            connection.query(
                sql,
                [name, phone, email, countryId],
                function (sqlErr, result, fields) {
                    if (sqlErr) throw sqlErr;

                    console.log(fields);
                    console.log(result);
                });
        });
    },

    customersList: function (req, res) {
        // this.list.forEach(customer => {
        //     console.log(`ok. name: ${customer.name} was created.`);
        // })

        pool.getConnection(function (connErr, connection) {
            if (connErr) throw connErr; // not connected!

            const sql = "SELECT * FROM customers";

            connection.query(sql, function (sqlErr, result, fields) {
                if (sqlErr) throw sqlErr;

                res.send(result);
            });
        });
    }
}
