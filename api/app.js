if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const express = require('express')
const app = express()
const methodOverride = require('method-override')
const path = require('path')
const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')
const bookRouter = require('./routes/books')
const dbConnect = require('./dbConnect')
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "client", "build")));
app.use(methodOverride('_method'))
app.use(express.urlencoded({ limit: '10mb', extended: false }))
dbConnect()
app.use('/', indexRouter)
app.use('/authors', authorRouter)
app.use('/books', bookRouter)

const port = process.env.PORT || 5000
app.listen(port, function () {
    console.log(`server run on ${port}`)
})