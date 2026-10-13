import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { OrderProvider } from './context/OrderProvider.jsx'

createRoot(document.getElementById('root')).render(

  <BrowserRouter>

    <StrictMode>

      <OrderProvider>
        <App />
      </OrderProvider>

    </StrictMode>,

  </BrowserRouter>

)
