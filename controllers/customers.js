const database = require('./database');

module.exports = {
    // addCustomer: function (name, phone, email, countryId) {
    //     if (!name || name.length === 0) {
    //         throw ('ERROR: name is empty');
    //     }

    //     database.pool.getConnection(function (connErr, connection) {
    //         if (connErr) throw connErr; // not connected!

    //         const sql = "INSERT INTO customers(name, phone, email, country_id)" +
    //             " VALUES(?,?,?,?);";

    //         connection.query(
    //             sql,
    //             [name, phone, email, countryId],
    //             function (sqlErr, result, fields) {
    //                 if (sqlErr) throw sqlErr;

    //                 // console.log(fields);
    //                 console.log(result);
    //             });
    //     });
    // },

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
    }
}
