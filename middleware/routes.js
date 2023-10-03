const listRoutes = (app) => {
    app.get('/api/tables', (req, res) => {
        const routes = [];
    
        app._router.stack.forEach(middleware => {
            if (middleware.route) {
                routes.push({
                    path: middleware.route.path,
                    method: Object.keys(middleware.route.methods)[0].toUpperCase()
                });
            }
        });
    
        res.json(routes);
    });
};

module.exports = listRoutes;
