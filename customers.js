const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'apps',
    database: 'royal_crm',
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

            const sql = "INSERT INTO customers(name, phone, email, country_id)" +
                " VALUES('" + name + "','" + phone + "','" + email + "','" + countryId + "');";

            connection.query(sql, function (sqlErr, result, fields) {
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
