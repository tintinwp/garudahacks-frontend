import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import PWABadge from './PWABadge.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <PWABadge />
    <App />
  </>
)
