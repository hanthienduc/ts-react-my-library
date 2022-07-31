import { useContext } from "react"
import { Link } from "react-router-dom"
import { AuthorContext } from "../../context/AuthorContext"

type AuthorItemProps = {
    name: string,
    id: string
}
export function AuthorItem({ name, id }: AuthorItemProps) {

    const { deleteAuthorItem } = useContext(AuthorContext)

    return (
        <div className="author-row">
            <div className="author-name">{name}</div>
            <div className="btn-row">
                <Link className="btn btn-primary" to={`/authors/${id}`}>View</Link>
                <Link className="btn btn-primary" to={`/authors/${id}/edit`}>Edit</Link>
                <button onClick={() => deleteAuthorItem(id)} className="btn btn-danger" type="submit">Delete</button>
            </div>
        </div>
    )
}