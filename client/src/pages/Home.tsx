import { useEffect, useState } from "react"
import { BookGrid } from "../components/BookGrid"
import { useBooks } from "../hooks/useBooks"
import { book } from "../interfaces/book"
import { api_base } from "../utilities/apiUrl"

export function Home() {

    const { books } = useBooks()

    return (
        <div>
            <h2 className="page-header">Recently Added</h2>
            <BookGrid books={books} large={false} />
        </div>
    )
}