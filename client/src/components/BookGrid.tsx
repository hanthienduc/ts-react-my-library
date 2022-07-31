import { Link } from "react-router-dom"
import { book } from "../interfaces/book"

type BookGridProps = {
    books: book[],
    large: boolean
}
export function BookGrid({ books: books, large }: BookGridProps) {
    const bookCoverClass = large ? 'book-cover-large' : 'book-cover'
    const bookGridClass = large ? 'book-grid-large' : ''

    const bookElements = books.map(book => {
        const base64String = btoa(String.fromCharCode(...new Uint8Array(book.coverImage.data)));
        const coverImagePath = `data:image/png;base64,${base64String}`
        return <Link key={book.id} to={`/books/:${book.id}`}>
            <img className={`book-cover ${bookCoverClass}`} src={coverImagePath} />
        </Link>
    })
    return (
        <div className={`book-grid ${bookGridClass}`}>
            {bookElements}
        </div>
    )
}