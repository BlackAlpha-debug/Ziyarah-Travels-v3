import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Analytics } from '@vercel/analytics/react';
// Render the app
createRoot(document.getElementById('root')!).render(
  <>
    <App />
    <Analytics /> {/* ✅ Add Analytics here — after App */}
  </>
)

createRoot(document.getElementById("root")!).render(<App />);
