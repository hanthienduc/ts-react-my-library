import { Link } from "react-router-dom";

export function Header() {
    return (
        <header>
            <nav className="header-nav">
                <Link to={'/'} className="header-title">My library</Link>
                <ul>
                    <li><Link to={'/books'}>Books</Link></li>
                    <li><Link to={'/books/new'}>Add Book</Link></li>
                    <li><Link to={'/authors'}>Authors</Link></li>
                    <li><Link to={'/authors/new'}>Add Author</Link></li>
                </ul>
            </nav>
        </header>
    )
}