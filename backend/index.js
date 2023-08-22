module.exports = (app, io, db) => {
    
    app.post("/cartadd", (req, res) => {
        if (!req.session.cart) {
            req.session.cart = [];
        }
        req.session.cart.push(req.body);
        res.redirect("/");
    });

    app.post("/cartremove", (req, res) => {
        if (!req.session.cart) {
            req.session.cart = [];
        }
        var index = req.session.cart.indexOf(item => item.id == req.body.id);
        req.session.cart.splice(index, 1);
        res.redirect("/");
    });
}