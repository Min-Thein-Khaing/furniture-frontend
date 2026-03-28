import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { router } from './routes/router'
import { RouterProvider } from 'react-router/dom'
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from 'sonner'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
      <Toaster  />
    </ThemeProvider>
  </StrictMode>,
)
