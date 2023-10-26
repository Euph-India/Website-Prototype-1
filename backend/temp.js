module.exports = (app, io, db) => {
    app.get('/import', async (req, res) => {
        await db.set('products', [
            {
                img: "https://via.placeholder.com/150",
                name: '3*Euphoria T-Shirt',
                intro: "Design better than 4400kg of democracy.",
                desc: "During the Cold War, Dr. Evelyn Whimsy, a quirky scientist, accidentally discovered a way to neutralize nuclear threats, inspired by a butterfly in her lab. She created a design featuring a butterfly behind \"euphoria\" to symbolize her breakthrough, embodying our brand's values of hope and the unexpected in the face of darkness.",
                price: 799,
                beforeprice: 999,
                id: 1,
                sizes: [
                    "small",
                    "medium",
                    "large"
                ]
            },
            {
                img: "https://via.placeholder.com/150",
                name: 'Euphoria T-Shirt',
                intro: "Abstract text flowing smoother than the blood in your veins.",
                desc: "to be honest, i don't know what to put here.",
                price: 799,
                beforeprice: 999,
                id: 2,
                sizes: [
                    "small",
                    "medium",
                    "large"
                ]
            },
            {
                img: "https://via.placeholder.com/150",
                name: 'JJK Anime T-Shirt',
                intro: "That gojo is a real one tho. RIP",
                desc: "In the whimsical world of anime, after the dramatic exit of Gojo, a mischievous artist named Hiroki crafted a design in his honor. This playful homage featured Gojo's character and a mysterious Japanese text, adding a dash of intrigue and a lot of anime love to our collection!",
                price: 849,
                beforeprice: 999,
                id: 3,
                sizes: [
                    "small",
                    "medium",
                    "large"
                ]
            },
        ])
        res.redirect('/#shop')
    })
}