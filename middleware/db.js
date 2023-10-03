const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'Chinook'
});

db.connect((err) => {
    if (err) throw err;
    console.log('MySQL verbunden!');
});

module.exports = db;
