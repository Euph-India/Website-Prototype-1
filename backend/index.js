module.exports = (app, io, db) => {
    app.post("/cartadd", async (req, res) => {
        if (!req.session.cart) {
            req.session.cart = [];
        }
        req.body.name = (await db.get("products")).find(item => item.id == req.body.id).name;
        req.body.price = (await db.get("products")).find(item => item.id == req.body.id).price;
        if (req.session.cart.find(item => item.id == req.body.id && item.size == req.body.size)) {
            req.session.cart.find(item => item.id == req.body.id && item.size == req.body.size).quantity = parseInt(req.session.cart.find(item => item.id == req.body.id && item.size == req.body.size).quantity) + parseInt(req.body.quantity);
            res.redirect("/cart");
            return;
        }
        req.session.cart.push(req.body);
        res.redirect("/cart");
    });

    app.post("/cartremove", (req, res) => {
        if (!req.session.cart) {
            req.session.cart = [];
        }
        var index = req.body.index
        req.session.cart.splice(index, 1);
        res.redirect("/cart");
    });

    app.get("/clearcart", (req, res) => {
        req.session.cart = [];
        res.redirect("/cart");
    });
}