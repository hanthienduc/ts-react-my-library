import { useEffect, useState } from "react"
import { Book } from "../interfaces/book"
import { api_base } from "../utilities/apiUrl"

export function useBooks() {
    const [books, setBooks] = useState<Book[]>([])

    useEffect(() => {
        getBooks()
    }, [])

    function getBooks() {
        fetch(`${api_base}`)
            .then(res => res.json())
            .then(data => setBooks(data.books))
            .catch(err => console.log(err))
    }

    return {
        books: books
    }
}