import { useContext, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { BookContext } from "../../context/BookContext"
import { Book } from "../../interfaces/Book"
import { api_base } from "../../utilities/apiUrl"
export function BookDetail() {

    const { id } = useParams()

    const [book, setBook] = useState<Book>()

    const { deleteBookItem } = useContext(BookContext)

    useEffect(() => {
        fetch(`${api_base}books/${id}`)
            .then(res => res.json())
            .then(data => {
                setBook(data.book)
            })
    }, [id])


    return (
        <div>
            <h2 className="page-header">{book?.title}</h2>
            <div className="book-details">
                <div className="book-details-left">
                    {book?.imageUrl && <img loading="lazy" className="book-cover" src={book && book.imageUrl} />}
                    <div className="book-details-btn-grid">
                        <Link className="btn btn-primary"
                            to={`/books/${book?._id}/edit`}>Edit</Link>
                        {book && <button onClick={() => deleteBookItem(book?._id)}
                            className="btn btn-danger" type="submit">Delete</button>}
                        <Link className="btn btn-primary book-details-author-button"
                            to={`/authors/${book?.author._id}`}>View Author</Link>
                    </div>
                </div>
                <div className="book-details-grid">
                    <div className="book-details-label">Author:</div>
                    <div>{book?.author.name}</div>
                    <div className="book-details-label">Publish Date:</div>
                    <div>{book && new Date(book.publishDate).toDateString()}</div>
                    <div className="book-details-label">Page Count:</div>
                    <div>{book?.pageCount}</div>
                    <div className="book-details-label">Description:</div>
                    <div>{book?.description}</div>
                </div>
            </div>
        </div>
    )
}