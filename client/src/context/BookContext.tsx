import { createContext, ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Book } from "../interfaces/Book";
import { api_base } from "../utilities/apiUrl";

type BookContext = {
    books: Book[],
    deleteBookItem: (id: string) => void
}

const BookContext = createContext({} as BookContext)

type BookContextProvider = {
    children: ReactNode,
}

function BookContextProvider({ children }: BookContextProvider) {

    const [books, setBooks] = useState<Book[]>([])

    const navigate = useNavigate()

    useEffect(() => {
        getBooks()
    }, [])

    function getBooks() {
        fetch(`${api_base}`)
            .then(res => res.json())
            .then(data => setBooks(data.books))
            .catch(err => console.log(err))
    }

    async function deleteBookItem(id: string){
        if (id !== undefined) {
            const data = await fetch(`${api_base}books/delete/${id}`,
                { method: 'DELETE' }).then(res => res.json())
            setBooks(book => book.filter(book => book._id !== data.id))
            navigate(`/books`, { replace: true })
        }
    }

    return (
        <BookContext.Provider value={{ books, deleteBookItem }}>
            {children}
        </BookContext.Provider>
    )
}

export {BookContextProvider, BookContext}