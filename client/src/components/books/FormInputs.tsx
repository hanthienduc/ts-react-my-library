import { useEffect } from "react"
import { useAddEditBook } from "../../hooks/useAddEditBook"
import { Book } from "../../interfaces/Book"

type FormInputsProps = {
    formTitle: string,
    submitBtnTitle: string,
    isAddBook: boolean,
    bookData?: Book
}

export function FormInputs({ formTitle, submitBtnTitle, isAddBook, bookData }: FormInputsProps) {

    const { handleAddBook,
        handleInputChange,
        book,
        setBook,
        handleSelect,
        authors,
        uploadImage,
        image,
        loading,
        handleAreaChange } = useAddEditBook()

    return (
        <div>
            <h2 className="page-header">{formTitle}</h2>
            <form onSubmit={(e) => handleAddBook(e, isAddBook)}>
                <div className="form-row">
                    <div className="form-item">
                        <label>Title</label>
                        <input required type="text" name="title" onChange={handleInputChange}
                            value={bookData ? bookData.title : book.title} />
                    </div>
                    <div className="form-item">
                        <label>Author</label>
                        <select required value={bookData ? bookData.author?.name : book.author?.name} onChange={handleSelect}>
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
                            value={bookData ? bookData.publishDate : book.publishDate} />
                    </div>
                    <div className="form-item">
                        <label>Page Count</label>
                        <input required type="number" name="pageCount" onChange={handleInputChange} min="1"
                            value={bookData ? bookData.pageCount : book.pageCount} />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-item form-item-no-grow">
                        <label>Cover</label>
                        <input
                            className="book-cover"
                            type="file"
                            name="file"
                            placeholder="Upload an image"
                            onChange={uploadImage}
                        />
                        {loading ? (
                            <h3>Loading...</h3>
                        ) : (
                            image && <img className="book-image-holder" src={image} />
                        )}
                    </div>
                    <div className="form-item">
                        <label>Description</label>
                        <textarea onChange={handleAreaChange} name="description"
                            value={bookData ? bookData.description : book.description} />
                    </div>
                </div>
                <div className="form-row form-row-end btn-row">
                    <a className="btn btn-danger" href="/books">Cancel</a>
                    <button className="btn btn-primary" type="submit">{submitBtnTitle}</button>
                </div>
            </form>
        </div>
    )
}