import { ChangeEventHandler, SyntheticEvent, useContext, useEffect, useState } from "react"
import { AuthorItem } from "../components/authors/AuthorItem"
import { Author, AuthorContext } from "../context/AuthorContext"

export function Authors() {

    const [name, setName] = useState('')

    const { handleSearch, searchResults } = useContext(AuthorContext)

    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        const { value } = e.currentTarget
        setName(value)
    }

    useEffect(() => {
        handleSearch(name);
    }, [name]);

    const authorElements = searchResults?.map(author => {
        return <AuthorItem key={author._id} name={author.name} id={author._id} />
    })

    return (
        <div>
            <h2 className="page-header">Search Authors</h2>
            <div className="form-row">
                <div className="form-item">
                    <label>Name</label>
                    <input placeholder="search.." type="text" name="name" value={name} onChange={handleChange} />
                </div>
            </div>
            <br />
            {authorElements}
        </div>
    )
}

