import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './stylesheets/main.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthorContextProvider } from './context/AuthorContext'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthorContextProvider>
        <App />
      </AuthorContextProvider>
    </BrowserRouter>
  </React.StrictMode>
)
