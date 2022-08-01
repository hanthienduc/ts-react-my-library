import { useContext, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Author, AuthorContext } from "../../context/AuthorContext"
import { Book } from "../../interfaces/Book"
import { api_base } from "../../utilities/apiUrl"
import { BookGrid } from "../BookGrid"

export function AuthorDetail() {
    const {deleteAuthorItem } = useContext(AuthorContext)

    const [author, setAuthor] = useState<Author>({} as Author)

    const [booksByAuthor, setBooksByAuthor] = useState<Book[]>([])

    const { id } = useParams()
    useEffect(() => {
        fetch(`${api_base}authors/${id}`)
            .then(res => res.json())
            .then(data => {
                setAuthor(data.author)
                setBooksByAuthor(data.booksByAuthor)
            })
    }, [id])

    return (
        <div>
            <h2 className="page-header">{author?.name}</h2>
            <div className="btn-row">
                <Link className="btn btn-primary" to={`/authors/${author?._id}/edit`}>Edit</Link>
                {author && <button onClick={() => deleteAuthorItem(author?._id)} className="btn btn-danger" type="submit">Delete</button>}
            </div>
            <h2 className="page-header">Books By Author</h2>
            {booksByAuthor?.length > 0 ? <BookGrid books={booksByAuthor} large={false} /> : ''}

        </div>
    )
}