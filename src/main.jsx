import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router'
import { router } from './router/Routes.jsx'
import AuthProvider from './context/AuthProvider.jsx'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <AuthProvider>
    <Toaster/>
    <RouterProvider router={router}></RouterProvider>
   </AuthProvider>
  </StrictMode>,
)
