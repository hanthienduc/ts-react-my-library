import { ChangeEventHandler, SyntheticEvent, useContext, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { AuthorContext } from "../../context/AuthorContext"
import { api_base } from "../../utilities/apiUrl"

export function EditAuthor() {
    const { authors } = useContext(AuthorContext)

    const { id } = useParams()

    const author = authors.find(author => author._id === id)

    const [name, setName] = useState(author?.name)

    const navigate = useNavigate()

    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        const { value } = e.currentTarget;
        setName(value)
    }

    const updateAuthor = async (e: SyntheticEvent) => {
        e.preventDefault()
        const result = await fetch(`${api_base}authors/update/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: name
            })
        })
        .then(res => res.json())

        navigate(`/authors/${result.id}`)
    }

    return (
        <div>
            <h2 className="page-header">Edit Author</h2>
            <form onSubmit={updateAuthor} >
                <div className="form-row">
                    <div className="form-item">
                        <label>Name</label>
                        <input type="text" name="name" onChange={handleChange} value={name} />
                    </div>
                </div>
                <div className="form-row form-row-end btn-row">
                    <Link className="btn btn-danger" to={`/authors/${author?._id}`}>Cancel</Link>
                    <button className="btn btn-primary" type="submit">Update</button>
                </div>
            </form>

        </div>
    )
}