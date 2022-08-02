const express = require('express')
const Author = require('../models/author')
const router = express.Router()
const path = require('path')
const Book = require('../models/book')
const imageMimeTypes = ['image/jpeg', 'image/png', 'images/gif']

// All books route
router.get('/', async (req, res) => {

    let query = Book.find()
    try {
        const books = await query.exec()
        // res.render('books/index', {
        //     books: books,
        //     searchOptions: req.query
        // })
        res.json({ books: books })
    } catch (err) {
        res.redirect('/')
    }

})

// Search book route
router.get('/search?', async (req, res) => {

    let query = Book.find()
    if (req.query.title != null && req.query.title != '') {
        query = query.regex('title', new RegExp(req.query.title, 'i'))
    }
    if (req.query.publishedBefore != null && req.query.publishedBefore != '') {
        query = query.lte('publishDate', req.query.publishedBefore)
    }
    if (req.query.publishedAfter != null && req.query.publishedAfter != '') {
        query = query.gte('publishDate', req.query.publishedAfter)
    }
    try {
        const books = await query.exec()
        // res.render('books/index', {
        //     books: books,
        //     searchOptions: req.query
        // })
        res.json({ books: books, searchOptions: req.query })
    } catch (err) {
        res.redirect('/')
    }

})


// // New Book Route
// router.post('/new', async (req, res) => {
//     renderNewPage(res, new Book())
// })

// Create Book route
router.post('/', async (req, res) => {
    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        publishDate: new Date(req.body.publishDate),
        pageCount: req.body.pageCount,
        description: req.body.description,
        // fileEncodeDataURL: req.body.fileEncodeDataURL
    })
    // saveCover(book, req.body.cover)
    try {
        const newBook = await book.save()
        // res.redirect(`books/${newBook.id}`)
        res.json({ bookId: newBook.id })
    } catch (err) {
        // renderNewPage(res, book, true)
        res.json({ book: book })
    }
})


// Show book Route
router.get('/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id)
            .populate('author').exec()
        // res.render('books/show', { book: book })
        res.json({ book: book })
    } catch {
        res.redirect('/')
    }
})

// Edit Book Route
router.get('/:id/edit', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id)
        // renderEditPage(res, book)
        res.json({ book: book })
    } catch {
        res.redirect('/')
    }
})

router.put('/:id', async (req, res) => {
    let book

    try {
        book = await Book.findById(req.params.id)
        book.title = req.body.title
        book.author = req.body.author
        book.publishDate = req.body.publishDate
        book.pageCount = req.body.pageCount
        book.description = req.body.description
        if (req.body.cover != null && req.body.cover != '') {
            saveCover(book, req.body.cover)
        }
        await book.save()

        // res.redirect(`/books/${book.id}`)
        res.json({ bookId: book.id })

    } catch (err) {
        if (book != null) {
            // renderEditPage(res, book, true)
            res.json({ book: book })
        } else {
            res.redirect('/')
        }
    }
})

router.delete('/:id', async (req, res) => {
    let book
    try {
        book = await Book.findById(req.params.id)
        await book.remove()
        res.redirect('/books')
    } catch {
        if (book != null) {
            // res.render('books/show', {
            //     book: book,
            //     errorMessage: 'could not remove book'
            // })
            res.json({ book: book, errorMessage: 'could not remove book' })
        } else {
            res.redirect('/')
        }
    }
})


async function renderNewPage(res, book, hasError = false) {

    renderFormPage(res, book, 'new', hasError)

}


async function renderEditPage(res, book, hasError = false) {

    renderFormPage(res, book, 'edit', hasError)
}

async function renderFormPage(res, book, form, hasError = false) {

    // const localBook = book
    try {
        const authors = await Author.find({})
        const params = {
            authors: authors,
            book: book
        }
        if (hasError) {
            if (form === 'edit') {
                params.errorMessage = 'Error Updating Book'
            } else {
                params.errorMessage = 'Error Creating Book'
            }
        }

        // res.render(`books/${form}`, params)
        res.json(params)

    } catch (err) {
        res.redirect('/books')
        // console.log(err)
    }
}



function saveCover(book, coverEncoded) {
    if (coverEncoded == null) return
    const cover = JSON.parse(coverEncoded)
    if (cover != null && imageMimeTypes.includes(cover.type)) {
        book.coverImage = new Buffer.from(cover.data, 'base64')
        book.coverImageType = cover.type
    }
}

module.exports = router