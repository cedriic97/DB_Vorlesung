const express = require('express');
const router = express.Router();

module.exports = (db, logRoute) => {

    logRoute('/api/exampleEndpoint', 'GET');
    router.get('/exampleEndpoint', (req, res) => {
        const query = 'SELECT * FROM Customer AS c WHERE c.CustomerID = 1';
        
        db.query(query, (err, results) => {
            if (err) {
                console.error('Error executing query:', err.message);
                return res.status(500).send('Database error');
            }
            res.json(results);
        });
    });

    return router;
};
