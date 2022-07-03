const path = require('path');
const fs = require('fs');
const database = require('../controllers/database');

module.exports = {
    getHtmlFilePath: function (htmlFileName) {
        return path.join(__dirname, '../client', htmlFileName);
    },

    exportToFile: async function (res, sql, filePrefix) {
        try {
            const result = await database.query(sql);

            const now = new Date().getTime(); // moment.js
            const fileName = `${filePrefix}-${now}.txt`;
            const filePath = path.join(__dirname, '../exports', fileName);
            const stream = fs.createWriteStream(filePath);

            stream.on('open', function () {
                stream.write(JSON.stringify(result[0]));
                stream.end();
            });

            stream.on('finish', function () {
                res.json({ name: fileName });
            });
        }
        catch (err) {
            res.status(400).send('Error');
            // throw err;
        }
    },
}