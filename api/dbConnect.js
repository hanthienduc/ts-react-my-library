const mongoose = require('mongoose')
require('dotenv').config()

async function dbConnect() {
    mongoose.connect(
        process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('Database connected')
    }).catch((e) => {
        console.log('Unable to connect to MongoDB Atlas')
        console.log(e)
    })
}

module.exports = dbConnect