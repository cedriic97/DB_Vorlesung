const express = require('express');
const router = express.Router();

module.exports = (db, logRoute) => {
    const getTableNames = () => {
        return new Promise((resolve, reject) => {
            db.query('SHOW TABLES', (err, results) => {
                if (err) return reject(err);
                resolve(results.map(row => Object.values(row)[0]));
            });
        });
    };

    const createEndpointsForTables = async () => {
        const tables = await getTableNames();
        tables.forEach(table => {
            const path = `/api/${table}`;
            logRoute(path, 'GET');
            
            router.get(`/${table}`, (req, res) => {
                db.query(`SELECT * FROM ${table}`, (err, results) => {
                    if (err) {
                        console.error(`Error retrieving ${table}:`, err.message);
                        return res.status(500).send('Database error');
                    }
                    res.json(results);
                });
            });
        });
    };

    createEndpointsForTables();

    return router;
};
