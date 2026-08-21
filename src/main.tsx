import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router/dom';
import { router } from './router.tsx';
import { Analytics } from '@vercel/analytics/react';
import './global.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Analytics />
    <RouterProvider router={router}/>
  </StrictMode>,
);
