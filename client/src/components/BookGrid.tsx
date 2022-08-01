import { nanoid } from "nanoid"
import { Link } from "react-router-dom"
import { Book } from "../interfaces/Book"
import { getCoverImagePath } from "../utilities/getCoverImagePath"

type BookGridProps = {
    books: Book[],
    large: boolean
}
export function BookGrid({ books: books, large }: BookGridProps) {
    const bookCoverClass = large ? 'book-cover-large' : 'book-cover'
    const bookGridClass = large ? 'book-grid-large' : ''

    const bookElements = books.map(book => {
        return <Link key={nanoid()} to={`/books/${book._id}`}>
            <img className={`book-cover ${bookCoverClass}`}
                src={getCoverImagePath(book.coverImage.data)} />
        </Link>
    })
    return (
        <div className={`book-grid ${bookGridClass}`}>
            {bookElements}
        </div>
    )
}