import { Route, Routes } from 'react-router-dom'
import { AddNewAuthor } from './components/authors/AddNewAuthor'
import { AuthorDetail } from './components/authors/AuthorDetail'
import { EditAuthor } from './components/authors/EditAuthor'
import { AddNewBook } from './components/books/AddNewBook'
import { BookDetail } from './components/books/BookDetail'
import { EditBook } from './components/books/Editbook'
import { Header } from './components/Header'
import { Authors } from './pages/Authors'
import { Books } from './pages/Books'
import { Home } from './pages/Home'

function App() {
  return (
    <div className="container">
      <Header />
      <div className="inner-container">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='authors' element={<Authors />} />
          <Route path='authors/:id' element={<AuthorDetail />} />
          <Route path='authors/:id/edit' element={<EditAuthor />} />
          <Route path='authors/new' element={<AddNewAuthor />} />
          <Route path='books' element={<Books />} />
          <Route path='books/:id' element={<BookDetail />} />
          <Route path='books/:id/edit' element={<EditBook />} />
          <Route path='books/new' element={<AddNewBook />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
