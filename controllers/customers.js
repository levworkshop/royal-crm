const database = require('./database');

module.exports = {
    addCustomer: function (name, phone, email, countryId) {
        if (!name || name.length === 0) {
            throw ('ERROR: name is empty');
        }

        database.pool.getConnection(function (connErr, connection) {
            if (connErr) throw connErr; // not connected!

            const sql = "INSERT INTO customers(name, phone, email, country_id)" +
                " VALUES(?,?,?,?);";

            connection.query(
                sql,
                [name, phone, email, countryId],
                function (sqlErr, result, fields) {
                    if (sqlErr) throw sqlErr;

                    // console.log(fields);
                    console.log(result);
                });
        });
    },

    customersList: function (req, res) {
        database.pool.getConnection(function (connErr, connection) {
            if (connErr) throw connErr; // not connected!

            const sql = "SELECT * FROM customers";

            connection.query(sql, function (sqlErr, result, fields) {
                if (sqlErr) throw sqlErr;

                res.send(result);
            });
        });
    }
}
