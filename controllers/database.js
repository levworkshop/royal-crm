const mysql = require('mysql2');
const config = require('../config/dev');

const pool = mysql.createPool({
    host: config.DB_HOST,
    user: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,
    waitForConnections: true,
    connectionLimit: 5,
    queueLimit: 0
});

function getConnection() {
    return new Promise(function (resolve, reject) {
        pool.getConnection(function (connErr, connection) {
            if (connErr) reject(connErr) // not connected!
            else resolve(connection)
        })
    })
}

function runQuery(connection, sql) {
    return new Promise(function (resolve, reject) {
        connection.query(sql, function (sqlErr, result, fields) {
            if (sqlErr) reject(sqlErr)
            else resolve(result)
        });
    });
}

module.exports = {
    pool,
    getConnection,
    runQuery,
}