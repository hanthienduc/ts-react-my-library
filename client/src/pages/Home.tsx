import { useContext, useEffect, useState } from "react"
import { BookGrid } from "../components/BookGrid"
import { BookContext } from "../context/BookContext"
export function Home() {

    const { books } = useContext(BookContext)

    return (
        <div>
            <h2 className="page-header">Recently Added</h2>
            <BookGrid books={books} large={false} />
        </div>
    )
}