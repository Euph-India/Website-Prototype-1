module.exports = (app, io, db) => {
    app.get('/', (req, res) => {
        res.render('index', {
            title: 'Home',
        });
    });
}