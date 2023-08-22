module.exports = (app, io, db) => {
    app.get('/', async (req, res) => {
        res.render('index', {
            products: await db.get('products'),
        });
    });
}