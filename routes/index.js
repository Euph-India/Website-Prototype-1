module.exports = (app, io, db) => {
    app.get('/', async (req, res) => {
        res.render('index', {
            products: await db.get('products'),
            session: req.session,
        });
    });

    app.get('/about', (req, res) => {
        res.render('about', {
            session: req.session,
        });
    });
}