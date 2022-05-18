const database = require('./database');

module.exports = {
    // todo: update to use resent changes...

    addProduct: async function (req, res, next) {
        //     if (!name || name.length === 0) {
        //         throw ('ERROR: name is empty');
        //     }

        //     database.pool.getConnection(function (connErr, connection) {
        //         if (connErr) throw connErr; // not connected!

        const sql = "INSERT INTO products(name, description, price)" +
            " VALUES(?,?,?);";

        //         connection.query(
        //             sql,
        //             [name, desc, price],
        //             function (sqlErr, result, fields) {
        //                 if (sqlErr) throw sqlErr;

        //                 console.log(result);
        //             });
        //     });

        res.send('todo add products');
    },

    productsList: async function (req, res, next) {
        const sql = "SELECT * FROM products ORDER BY name ASC;";

        try {
            // const connection = await database.getConnection();
            const result = await database.query(sql);
            res.send(result[0]);
        }
        catch (err) {
            console.log(err);
        }
    },

    // todo: search product by name
    exportProducts: async function (req, res, next) {
        const sql = "SELECT name,description,price FROM products ORDER BY name ASC;";
        res.send('todo export products');
    },

    // todo: edit product details
    editProduct: async function (req, res, next) {
        // const sql = UPDATE
        res.send('todo update products');
     },

    // todo: delete product
    deleteProduct: async function (req, res, next) {
        // const sql = DROP
        res.send('todo delete products');
     },

    // todo: search product by name
    searchProducts: async function (req, res, next) {
        // const sql = SELECT WHERE...
        res.send('todo search products');
     },

    // todo: sort products by name...
}
