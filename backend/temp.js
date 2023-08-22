module.exports = (app, io, db) => {
    app.get('/import', async (req, res) => {
        await db.set('products', [
            {
                name: 'Product 1',
                price: 100,
                id: 1,
                colors: [
                    "red",
                    "blue",
                    "green"
                ],
                sizes: [
                    "small",
                    "medium",
                    "large"
                ]
            },
            {
                name: 'Product 2',
                price: 200,
                id: 2,
                colors: [
                    "red",
                    "blue",
                    "green"
                ],
                sizes: [
                    "small",
                    "medium",
                    "large"
                ]
            },
        ])
        res.redirect('/')
    })
}