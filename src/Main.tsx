// src/Main.tsx
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// ✅ CORRECT IMPORT — no "/react"
import { Analytics } from '@vercel/analytics';

createRoot(document.getElementById('root')!).render(
  <>
    <App />
    <Analytics />
  </>
);