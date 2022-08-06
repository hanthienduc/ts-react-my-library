import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BookContext } from "../../context/BookContext";
import { useAddEditBook } from "../../hooks/useAddEditBook";
import { api_base } from "../../utilities/apiUrl";
import { FormInputs } from "./FormInputs";

export function EditBook() {

    const { id } = useParams()

    const { book, setBook } = useAddEditBook()

    useEffect(() => {
        getBook()
        console.log(book)
    }, [id])


    const getBook = async () => {
        const req = await fetch(`${api_base}books/${id}`)
        const result = await req.json()
        console.log(result)
        setBook({
            ...result.book,
            publishDate: new Date(result.book.publishDate).toISOString().split('T')[0],
        })
    }

    return (
        <div>
            <FormInputs bookData={book} formTitle="Update Book" submitBtnTitle="Update" isAddBook={false} />
        </div>
    )
}