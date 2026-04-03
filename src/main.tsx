import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { router } from './routes/router'
import { RouterProvider } from 'react-router/dom'
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from 'sonner'
import { QueryClientProvider } from '@tanstack/react-query'
import queryClient from './api/query'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
      <RouterProvider router={router} />
      <Toaster  />
    </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
)
