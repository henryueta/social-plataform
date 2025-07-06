import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import { RouterProvider } from 'react-router-dom'
import {router} from './pages'
import AppProvider from './context'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProvider>
      <RouterProvider
      router={router}
      />
    </AppProvider>
  </StrictMode>,
)
