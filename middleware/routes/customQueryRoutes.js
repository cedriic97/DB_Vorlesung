const express = require('express');
const router = express.Router();

module.exports = (db, logRoute) => {

    logRoute('/api/customQuery', 'POST');
    router.post('/customQuery', (req, res) => {
        const sql = req.body.sql;

        if (!sql) {
            return res.status(400).send('SQL query is missing in request body.');
        }

        db.query(sql, (err, results) => {
            if (err) {
                console.error('Error executing custom query:', err.message);
                return res.status(500).send('Database error');
            }
            res.json(results);
        });
    });

    return router;
};
