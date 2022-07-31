import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { AddNewAuthor } from './components/authors/AddNewAuthor'
import { AuthorDetail } from './components/authors/AuthorDetail'
import { DeleteAuthor } from './components/authors/DeleteAuthor'
import { EditAuthor } from './components/authors/EditAuthor'
import { Header } from './components/Header'
import { AuthorContextProvider } from './context/AuthorContext'
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
          <Route path='authors/delete/:id' element={<DeleteAuthor />} />
          <Route path='authors/update/:id' element={<DeleteAuthor />} />
          <Route path='authors/:id' element={<AuthorDetail />} />
          <Route path='authors/:id/edit' element={<EditAuthor />} />
          <Route path='authors/new' element={<AddNewAuthor />} />
          <Route path='books' element={<Books />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
