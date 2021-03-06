const db = require('./db')
const Item = require('./models/item')

////////// Associations Here /////////////

const sample = [
    {
        name: "Hanes Men's EcoSmart Sweatshirt",
        link: "https://www.amazon.com/Hanes-EcoSmart-Fleece-Sweatshirt-Small/dp/B072K68D77/",
        imageURL: 'https://images-na.ssl-images-amazon.com/images/I/81fBr0EGoQL.__AC_SY445_SX342_QL70_FMwebp_.jpg',
        price: 20.99,
        targetPrice: 5.00,
        email: 'elcarnival1@gmail.com'
    },
    {
        name: "Sony Alpha 7 IV Full-Frame Mirrorless Interchangeable Lens Camera",
        link: "https://www.amazon.com/Sony-Full-Frame-Mirrorless-Interchangeable-Camera/dp/B09JZT6YK5/",
        imageURL: 'https://images-na.ssl-images-amazon.com/images/I/71LPbU9sO5L.__AC_SY300_SX300_QL70_FMwebp_.jpg',
        price: 3000.99,
        targetPrice: 2600.00,
        email: 'elcarnival1@gmail.com'
    },
]

const config = {
    force: true
};

if (process.env.HEROKU_POSTGRESQL_NAVY_URL) {
    delete config.force
}

const syncAndSeed = async () => {
    try {
        await db.authenticate();
        console.log('DB authenticated')
        await db.sync(config)
        console.log('DB Ready!')
        if (!process.env.HEROKU_POSTGRESQL_NAVY_URL) {
            await Promise.all(sample.map(item => Item.create(item)))
        }
    }
    catch (err) {
        console.log(err)
    }
}

module.exports = {
    db,
    syncAndSeed,
    models: {
        Item,
    },
}