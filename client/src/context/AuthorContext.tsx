import { createContext, ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Author } from "../interfaces/Author";
import { api_base } from "../utilities/apiUrl";
type AuthorContextProviderProps = {
    children: ReactNode
}

type AuthorContext = {
    authors: Author[],
    deleteAuthorItem: (id: string) => void,
    searchResults: Author[],
    handleSearch: (name: string) => void,
}

const AuthorContext = createContext({} as AuthorContext)

function AuthorContextProvider({ children }: AuthorContextProviderProps) {

    const [authors, setAuthors] = useState<Author[]>([])

    const [searchResults, setSearchResults] = useState<Author[]>([])

    const navigate = useNavigate()

    useEffect(() => {
        getAuthors()
    }, [authors])

    function getAuthors() {
        fetch(`${api_base}authors`)
            .then(res => res.json())
            .then(data => {
                setAuthors(data.authors)
                setSearchResults(data.authors)
            })
            .catch(e => console.log(e))
    }

    async function deleteAuthorItem(id: string) {
        if (id !== undefined) {
            const data = await fetch(`${api_base}authors/delete/${id}`,
                { method: 'DELETE' }).then(res => res.json())
            setAuthors(authors => authors.filter(author => author._id !== data.id))
            navigate(`/authors`, { replace: true })
        }
    }

    function handleSearch(name: string) {
        const results = authors.filter(author =>
            author.name.toLowerCase().includes(name)
        );
        setSearchResults(results);
    }

    return (
        <AuthorContext.Provider value={{
            authors,
            deleteAuthorItem,
            searchResults,
            handleSearch,
        }}>
            {children}
        </AuthorContext.Provider>
    )
}

export { AuthorContextProvider, AuthorContext }