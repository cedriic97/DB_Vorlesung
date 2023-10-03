const express = require('express');
const cors = require('cors');
const db = require('./db');
const customQueryRoutes = require('./routes/customQueryRoutes');
const additionalEndpoint = require('./routes/additionalEndpoint');
const tableRoutes = require('./routes/tableRoutes');

const app = express();

global.routes = [];
const logRoute = (path, method) => {
    global.routes.push({ path, method });
};

app.use(cors());
app.use(express.json()); 
app.use(express.static('public')); 

logRoute('/api/tables', 'GET');
app.get('/api/tables', (req, res) => {
    res.json(global.routes);
});

app.use('/api', customQueryRoutes(db, logRoute));
app.use('/api', additionalEndpoint(db, logRoute));
app.use('/api', tableRoutes(db, logRoute));

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
