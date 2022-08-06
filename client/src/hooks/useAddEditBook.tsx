import { ChangeEvent, ChangeEventHandler, SyntheticEvent, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AuthorContext } from "../context/AuthorContext"
import { Book } from "../interfaces/Book"
import { api_base } from "../utilities/apiUrl"

export function useAddEditBook() {

    const { authors } = useContext(AuthorContext)
    const [apiKey, setApiKey] = useState('')

    const [book, setBook] = useState<Book>({
        _id: '',
        title: '',
        author: {
            _id: '',
            name: ''
        },
        publishDate: '',
        pageCount: 0,
        description: '',
        imageUrl: ''
    })

    const navigate = useNavigate()

    useEffect(() => {
        setBook(prevBook => {
            return {
                ...prevBook,
                author: authors[0]
            }
        })
        getApiKey()
    }, [])

    const getApiKey = async () => {
        const result = await fetch(`${api_base}imgur_api_key`)
        const data = await result.json()
        setApiKey(data.apiKey)
    }

    const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        const { value: authorName } = e.currentTarget
        const author = authors.find(author => author.name === authorName) || authors[0]
        setBook((prevBook) => {
            return {
                ...prevBook,
                author: author
            }
        })
    }

    const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        const { name, value } = e.currentTarget
        setBook((prevBook) => {
            return {
                ...prevBook,
                [name]: value
            }
        })
    }

    const handleAreaChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
        const { name, value } = e.currentTarget
        setBook((prevBook) => {
            return {
                ...prevBook,
                [name]: value
            }
        })
    }

    const handleAddBook = async (e: SyntheticEvent, isAddBook: boolean) => {
        e.preventDefault()

        const result = await fetch(`${api_base}books/new`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: book.title,
                author: book.author._id,
                publishDate: book.publishDate,
                pageCount: book.pageCount,
                description: book.description,
                imageUrl: image
            })
        }).then(res => res.json())
        navigate(`/books/${result.bookId}`, { replace: true })
    }

    const [image, setImage] = useState('')
    const [loading, setLoading] = useState(false)

    const uploadImage: ChangeEventHandler<HTMLInputElement> = async (e) => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Client-ID ${apiKey}`);
        console.log(apiKey)
        const files = e.target.files
        const formdata = new FormData()
        if (files) {
            formdata.append('image', files[0])
        }
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
        };
        setLoading(true)
        const res = await fetch('https://api.imgur.com/3/image', requestOptions)
        const file = await res.json()

        setImage(file.data.link)
        console.log(file.data)
        setLoading(false)
    }

    return {
        handleAddBook,
        handleInputChange,
        book,
        setBook,
        handleSelect,
        authors,
        uploadImage,
        image,
        loading,
        handleAreaChange
    }
}