import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Header } from './components/Header'
import { Authors } from './pages/Authors'
import { Books } from './pages/Books'
import { Home } from './pages/Home'

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='authors' element={<Authors />} />
        <Route path='books' element={<Books />} />
      </Routes>
    </div>
  )
}

export default App
