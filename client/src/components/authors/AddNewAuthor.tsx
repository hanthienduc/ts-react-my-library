import { ChangeEventHandler, SyntheticEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api_base } from "../../utilities/apiUrl";

export function AddNewAuthor() {

    const [name, setName] = useState('')

    const navigate = useNavigate()

    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        const { value } = e.currentTarget;
        setName(value)
    }

    const addNewAuthor = async (e: SyntheticEvent) => {
        e.preventDefault()
        const data = await fetch(`${api_base}authors/new`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name
            })
        })
            .then(res => res.json())
        
        setName('')
        navigate(`/authors/${data.id}`, { replace: true } )
    }

    return (
        <div>
            <h2 className="page-header">New Author</h2>
            <form onSubmit={addNewAuthor} action="/authors/new" method="POST">
                <div className="form-row">
                    <div className="form-item">
                        <label>Name</label>
                        <input type="text" name="name" onChange={handleChange} value={name} />
                    </div>
                </div>
                <div className="form-row form-row-end btn-row">
                    <Link className="btn btn-danger" to="/authors">Cancel</Link>
                    <button className="btn btn-primary" type="submit">Create</button>
                </div>
            </form>
        </div>
    )
}