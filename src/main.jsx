import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { UserProvider } from './components/UserContext.jsx'
import App from './components/App.jsx'
import './../public/styles.css'
import './../public/header.css'
import './../public/details.css'
import './../public/allMovTv.css'


createRoot(document.getElementById('root')).render(
  <UserProvider>
    <App />
  </UserProvider>,
)
