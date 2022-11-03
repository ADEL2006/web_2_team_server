var mysql = require("mysql");
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Dnjswns1*',
    database: 'kosa',
    port: 3306
})
module.exports = db;