const { Webhook , MessageBuilder } = require('discord-webhook-node');
const hook = new Webhook("https://discord.com/api/webhooks/1171895012691288086/k2Woyh2M7q96q0_aZ79byz4uzGWs90dr6uRyv1ljW4kNWrfVhg0_Ea2JJBRHKhh5OhSD");

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
        if (!req.body.name || !req.body.email || !req.body.phone || !req.body.address || !req.body.city || !req.body.state || !req.body.pincode || req.session.cart.length == 0) {
            res.redirect("/cart");
            return;
        }
        if (!await db.get("orders")) {
            await db.set("orders", [])
        }
        var order = {
            id: ((await db.get("orders"))[(await db.get("orders")).length - 1].id + 1),
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
            total: req.session.cart.reduce((total, item) => total + item.price * item.quantity, 0)
        }

        const embed = new MessageBuilder()
        .setTitle('Order #' + order.id)
        .setURL('https://euph.live/911/order/' + order.id)
        .setColor('#00b0f4')
        .setDescription('New order has been placed!')
        .setTimestamp()
        .addField('Name', order.contact.name, true)
        .addField('Email', order.contact.email, true)
        .addField('Phone', order.contact.phone, true)
        .addField('Address', `
            ${order.shipping.address}
            ${order.shipping.city}
            ${order.shipping.state}
            ${order.shipping.pincode}
        `, true)
        .addField('Total', order.total, true)
        .addField('Items', order.items.map(item => `${item.name} (${item.size}) - ${item.quantity}`).join("\n"), true)
        .setFooter('Euph.live', '');
        
        hook.send(embed);

        db.push("orders", order)
        req.session.cart = [];
        res.render("order", {
            orderNumber: order.id,
            session: req.session
        });
    });
}