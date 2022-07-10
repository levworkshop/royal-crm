const database = require('./database');

module.exports = {
    getCountries: async function (req, res, next) {
        const sql = `SELECT * FROM countries ORDER BY name ASC;`;

        try {
            const result = await database.query(sql);
            res.json(result[0]);
        }
        catch (err) {
            console.log(err);
            res.json(err);
        }
    }
}