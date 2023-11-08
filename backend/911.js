module.exports = (app, io, db) => {
  app.get("/911/order/:id", async (req, res) => {
    var order = (await db.get("orders")).find(order => order.id == req.params.id);
    if (!order) {
      res.redirect("/911/orders");
      return;
    }
    res.render("911/order", {
      order: order
    });
  })

  app.get("/911/orders", async (req, res) => {
    var orders = await db.get("orders");
    res.render("911/orders", {
      orders: orders
    });
  })

  app.get("/911/orders/:id/delete", async (req, res) => {
    var orders = await db.get("orders");
    orders.splice(orders.findIndex(order => order.id == req.params.id), 1);
    await db.set("orders", orders);
    res.redirect("/911/orders");
  });
}