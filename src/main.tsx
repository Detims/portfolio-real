import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Analytics } from '@vercel/analytics/react';
import { RootLayout } from './RootLayout.tsx';
import './global.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Analytics />
    <RootLayout />
  </StrictMode>,
);
