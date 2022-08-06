import { ChangeEventHandler, SyntheticEvent, useContext, useEffect, useState } from "react";
import { BookGrid } from "../components/BookGrid";
import { BookContext } from "../context/BookContext";
import { Book } from "../interfaces/Book";
import { api_base } from "../utilities/apiUrl";

export function Books() {

    const { books } = useContext(BookContext)

    const [searchBooks, setSearchBooks] = useState<Book[]>([])

    const [searchData, setSearchData] = useState({
        title: '',
        publishedAfter: '',
        publishedBefore: ''
    })

    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        const { name, value } = e.currentTarget
        setSearchData((prevData) => {
            return {
                ...prevData,
                [name]: value
            }
        })
    }

    useEffect(() => {
        setSearchBooks(books)
    }, [books])

    const searchBook = async (e: SyntheticEvent) => {
        e.preventDefault()
        const headers = { 'Content-Type': 'application/json' }
        const searchResult = await fetch(`${api_base}books/search?
        ?title=${encodeURIComponent(searchData.title)}
        &publishedAfter=${encodeURIComponent(searchData.publishedAfter)}
        &publishedBefore=${encodeURIComponent(searchData.publishedBefore)}
        `, {
            method: 'GET',
            headers: headers,
        })
            .then((res) => res.json())
            .catch((err) => console.log(err))

        setSearchBooks(searchResult.books)
        console.log(searchResult)
    }

    return (
        <div>
            <h2 className="page-header">Search Book</h2>
            <form onSubmit={searchBook} action="/books" method="GET">
                <div className="form-row">
                    <div className="form-item">
                        <label>Title</label>
                        <input
                            required
                            type="text"
                            name="title"
                            value={searchData.title}
                            onChange={handleChange} />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-item">
                        <label>Published After</label>
                        <input
                            type="date"
                            name="publishedAfter"
                            value={searchData.publishedAfter}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-item">
                        <label>Published Before</label>
                        <input
                            type="date"
                            name="publishedBefore"
                            value={searchData.publishedBefore}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="form-row form-row-end">
                    <button className="btn btn-primary" type="submit">Search</button>
                </div>
            </form>
            <br />
            {searchBooks && <BookGrid books={searchBooks} large={false} />}
        </div>
    )
}