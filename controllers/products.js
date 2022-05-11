const database = require('./database');

module.exports = {
    // addProduct: function (name, desc, price) {
    //     if (!name || name.length === 0) {
    //         throw ('ERROR: name is empty');
    //     }

    //     database.pool.getConnection(function (connErr, connection) {
    //         if (connErr) throw connErr; // not connected!

    //         const sql = "INSERT INTO products(name, description, price)" +
    //             " VALUES(?,?,?);";

    //         connection.query(
    //             sql,
    //             [name, desc, price],
    //             function (sqlErr, result, fields) {
    //                 if (sqlErr) throw sqlErr;

    //                 console.log(result);
    //             });
    //     });
    // },

    productsList: async function (req, res, next) {
        const sql = "SELECT * FROM products";   
           
        try {    
            // const connection = await database.getConnection();
            const result = await database.query(sql);
            res.send(result[0]);
        } 
        catch (err) {
            console.log(err);
        }
    }
}
