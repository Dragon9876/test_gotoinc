import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'

import './index.scss';

// Import the generated route tree
import { routeTree } from './app/routes';
import { Toaster } from './shared/ui/toaster';

// Create a new router instance
const router = createRouter({ routeTree })

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className="flex min-h-screen w-full flex-col p-6">
      <RouterProvider router={router} />
      <Toaster />
    </div>
  </StrictMode>,
)
