const path = require('path');
const fs = require('fs');
const mongo = require('../controllers/database');

module.exports = {
  getHtmlFilePath: function (htmlFileName) {
    return path.join(__dirname, '../client', htmlFileName);
  },

  exportToFile: async function (res, collectionName) {
    try {
      const now = new Date().getTime(); // moment.js
      const filePath = path.join(__dirname, '../exports', `${collectionName}-${now}.txt`);
      const stream = fs.createWriteStream(filePath);

      const database = await mongo.getDb();
      const collection = database.collection(collectionName);

      const cursor = collection.find({});
      await cursor.forEach(doc => {
        stream.write(JSON.stringify(doc));
      });
      stream.end();

      stream.on('close', function () {
        res.send(`success. file at: ${filePath}`);
      })

      // stream.on('open', function () {
      //   stream.write(JSON.stringify(result[0]));
      //   stream.end();
      // });

      // stream.on('finish', function () {
      //   res.send(`Success. File at: ${filePath}`);
      // });
    }
    catch (err) {
      throw err;
    }
  },
}