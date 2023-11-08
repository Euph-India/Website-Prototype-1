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

    app.post("/checkout", async (req, res) => {
        if (!req.session.cart) {
            req.session.cart = [];
        }
        var order = {
            id: (await db.get("orders")).length + 1,
            contact: {
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone
            },
            items: req.session.cart,
            shipping: {
                address: req.body.address,
                city: req.body.city,
                state: req.body.state,
                pincode: req.body.pincode
            },
            total: req.session.cart.reduce((total, item) => total + item.price * item.quantity, 0),
            status: "Pending"
        }
        db.push("orders", order)
        req.session.cart = [];
        res.render("order", {
            order: order,
            session: req.session
        });
    });
}