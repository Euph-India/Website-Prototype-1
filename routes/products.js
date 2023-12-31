module.exports = (app, io, db) => {
  app.get("/shop", async (req, res) => {
    var products = await db.get("products");
    res.render("shop", {
      products: products,
      session: req.session,
    });
  });
  
  app.get("/products/:id", async (req, res) => {
    var products = await db.get("products");
    var product = products.find(
      (product) => product.id.toString() == req.params.id
    );
    res.render("product", {
      product: product,
      session: req.session,
    });
  });

  app.get("/cart", async (req, res) => {
    if (!req.session.cart) {
      req.session.cart = []
    }
    res.render("cart", {
      session: req.session,
    });
  });

  app.get("/checkout", async (req, res) => {
    if (!req.session.cart) {
      req.session.cart = []
    }
    res.render("checkout", {
      session: req.session,
    });
  });
};
