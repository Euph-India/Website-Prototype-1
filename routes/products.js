module.exports = (app, io, db) => {
    app.get('/products/:id', async (req, res) => {
        var products = await db.get('products')
        var product = products.find(product => product.id.toString() == req.params.id)
        res.render('product', { 
            product: product,
         }) 
    })

    app.get("/cart" , async (req, res) => {
        res.render("cart", {
            cart: req.session.cart,
        });
    });
}