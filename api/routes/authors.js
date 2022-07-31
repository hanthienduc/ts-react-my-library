const express = require('express')
const router = express.Router()
const Author = require('../models/author')
const Book = require('../models/book')

// All authors route
router.get('/', async (req, res) => {
    let searchOptions = {}
    if (req.query.name != null && req.query.name !== '') {
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try {
        const authors = await Author.find(searchOptions)
        res.json({ authors: authors, searchOptions: req.query })
    } catch (err) {
        res.redirect('/')
    }
})

// New Author Route
// router.get('/new', (req, res) => {
//     res.json({ author: new Author() })
// })

// Create Author route
router.post('/new', async (req, res) => {
    const author = new Author({
        name: req.body.name
    })
    try {
        const newAuthor = await author.save()
        // res.redirect(`authors/${newAuthor.id}`)
        res.status(200).json({ id: newAuthor.id })
    } catch (err) {
        // res.render('authors/new', {
        //     author: author,
        //     errorMessage: 'Error creating Author'
        // })
        res.status(500).json({ author: author, errorMessage: 'Error creating Author' })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const author = await Author.findById(req.params.id)
        const books = await Book.find({ author: author.id }).limit(6).exec()
        // res.render('authors/show', {
        //     author: author,
        //     booksByAuthor: books
        // })
        res.json({ author: author, booksByAuthor: books })
    } catch (e) {
        console.log(e)
        res.redirect('/')
    }
})

// router.get('/:id/edit', async (req, res) => {
//     try {
//         const author = Author.findById(req.params.id)
//         res.json({ author: author })
//     } catch {
//         res.json({ error: 'error edit user' })
//     }
// })

router.put('/update/:id', async (req, res) => {
    let author
    try {
        author = await Author.findById(req.params.id)
        author.name = req.body.name
        await author.save()
        // res.redirect(`/authors/${author.id}`)
        res.json({ id: author.id })
    } catch (err) {
        if (author == null) {
            res.redirect('/')
        } else {
            // res.render('authors/edit', {
            //     author: author,
            //     errorMessage: 'Error updating Author'
            // })
            res.json({ author: author, errorMessage: 'Error updating Author' })
        }
    }
})

router.delete('/delete/:id', async (req, res) => {
    let author
    try {
        author = await Author.findById(req.params.id)
        await author.remove()
        // res.redirect(`/authors`)
        res.json({ id: author._id });
    } catch (err) {
        if (author == null) {
            res.redirect('/')
        } else {
            // res.redirect(`authors/${author.id}`)
            res.json({ id: author.id })
        }
    }
})

module.exports = router