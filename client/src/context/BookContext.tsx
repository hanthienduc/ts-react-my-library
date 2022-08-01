import { createContext, ReactNode, useEffect, useState } from "react";
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

    useEffect(() => {
        getBooks()
    }, [])

    function getBooks() {
        fetch(`${api_base}`)
            .then(res => res.json())
            .then(data => setBooks(data.books))
            .catch(err => console.log(err))
    }

    function deleteBookItem(id: string){
        
    }

    return (
        <BookContext.Provider value={{ books, deleteBookItem }}>
            {children}
        </BookContext.Provider>
    )
}

export {BookContextProvider, BookContext}