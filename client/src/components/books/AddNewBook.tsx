import { ChangeEvent, ChangeEventHandler, SyntheticEvent, useContext, useEffect, useState } from "react"
import { Author, AuthorContext } from "../../context/AuthorContext"
import { Book } from "../../interfaces/Book"
// Import React FilePond
import { FilePond, registerPlugin } from 'react-filepond';

// Import FilePond styles
import 'filepond/dist/filepond.min.css';

import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import FilePondPluginImageResize from 'filepond-plugin-image-resize'
import FilePondPluginFileEncode from 'filepond-plugin-file-encode'
import { File } from "filepond";
import { api_base } from "../../utilities/apiUrl";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview
    , FilePondPluginImageResize, FilePondPluginFileEncode
);

export function AddNewBook() {

    const { authors } = useContext(AuthorContext)

    const [book, setBook] = useState({
        title: '',
        author: {
            _id: '',
            name: ''
        },
        publishDate: '',
        pageCount: 0,
        description: '',
        fileEncodeDataURL: ArrayBuffer
    })

    const [files, setFiles] = useState([]);

    const [selectedAuthor, setSelectedAuthor] = useState<Author>({} as Author);

    const navigate = useNavigate()

    useEffect(() => {
        setBook(prevBook => {
            return {
                ...prevBook,
                author: authors[0]
            }
        })
    }, [])

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

    const handleAddBook = async (e: SyntheticEvent) => {
        e.preventDefault()
        // console.log(files[0].getFileEncodeDataURL())
        // console.log(files[0].getFileEncodeBase64String())

        const fileEncodeDataURL = files[0].getFileEncodeDataURL()

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
                fileEncodeDataURL: fileEncodeDataURL
            })
        }).then(res => res.json())

        console.log(result)

        // navigate(`/books/${result.bookId}`, { replace: true })
    }



    return (
        <div>
            <h2 className="page-header">New Book</h2>
            <form onSubmit={handleAddBook}>
                <div className="form-row">
                    <div className="form-item">
                        <label>Title</label>
                        <input required type="text" name="title" onChange={handleInputChange} value={book.title} />
                    </div>
                    <div className="form-item">
                        <label>Author</label>
                        <select required value={book.author?.name} onChange={handleSelect}>
                            {authors && (
                                authors.map(author => {
                                    return <option key={author.name}
                                        label={author.name}
                                        value={author.name} />
                                })
                            )}
                        </select>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-item">
                        <label>Publish Date</label>
                        <input required type="date" onChange={handleInputChange} name="publishDate"
                            value={book.publishDate} />
                    </div>
                    <div className="form-item">
                        <label>Page Count</label>
                        <input required type="number" name="pageCount" onChange={handleInputChange} min="1" value={book.pageCount} />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-item form-item-no-grow">
                        <label>Cover</label>
                        <FilePond
                            required
                            className="book-cover filepond"
                            files={files}
                            onupdatefiles={setFiles}
                            allowMultiple={true}
                            maxFiles={1}
                            server={{
                                process: {
                                    'url': "https://api.imgbb.com/1/upload?expiration=600&key=2cf815a02e87e6ebaea402cd847e0845",
                                    
                                }
                            }}
                            name="cover"
                            labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                        />

                    </div>
                    <div className="form-item">
                        <label>Description</label>
                        <textarea onChange={handleAreaChange} name="description" value={book.description} />
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