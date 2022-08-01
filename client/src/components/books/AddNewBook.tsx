import { useContext, useState } from "react"
import { AuthorContext } from "../../context/AuthorContext"
import { Book } from "../../interfaces/Book"

export function AddNewBook() {

    const { authors } = useContext(AuthorContext)

    const [book, setBook] = useState<Book>({} as Book)

    const authorsElement = authors.map(author => {
        if (author._id === book.author._id) {
            return <option selected label={author.name} value={author._id} ></option>
        } else {
            return <option label={author.name} value={author._id} ></option>
        }
    })
    return (
        <div>
            <h2 className="page-header">New Book</h2>
            <form action="/books" method="POST">
                <div className="form-row">
                    <div className="form-item">
                        <label>Title</label>
                        <input type="text" name="title" value={book.title} />
                    </div>
                    <div className="form-item">
                        <label>Author</label>
                        <select name="author">
                            {authors && authorsElement}
                        </select>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-item">
                        <label>Publish Date</label>
                        <input type="date" name="publishDate"
                            value={book.publishDate == null ? '' :
                                book.publishDate.toISOString().split('T')[0]} />
                    </div>
                    <div className="form-item">
                        <label>Page Count</label>
                        <input type="number" name="pageCount" min="1" value={book.pageCount} />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-item form-item-no-grow">
                        <label>Cover</label>
                        <input type="file" name="cover" className="book-cover filepond" />
                    </div>
                    <div className="form-item">
                        <label>Description</label>
                        <textarea name="description" value={book.description} />
                    </div>
                </div>
                <div className="form-row form-row-end btn-row">
                    <a className="btn btn-danger" href="/books">Cancel</a>
                    <button className="btn btn-primary" type="submit">Create</button>
                </div>
            </form>
        </div>
    )
}