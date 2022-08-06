import { nanoid } from "nanoid"
import { Link } from "react-router-dom"
import { Book } from "../interfaces/Book"
type BookGridProps = {
    books: Book[],
    large: boolean
}
export function BookGrid({ books: books, large }: BookGridProps) {
    const bookCoverClass = large ? 'book-cover-large' : 'book-cover'
    const bookGridClass = large ? 'book-grid-large' : ''

    const bookImageElements = books.map(book => {
        return <Link key={nanoid()} to={`/books/${book._id}`}>

            <div>
                <h3>{book.title}</h3>
                {book.imageUrl && <img loading="lazy" className={`book-cover ${bookCoverClass}`}
                    src={book.imageUrl} />}
            </div>

        </Link>
    })
    return (
        <div className={`book-grid ${bookGridClass}`}>
            {bookImageElements}
        </div>
    )
}