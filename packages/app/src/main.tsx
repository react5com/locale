import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/1-reset.scss'
import './styles/2-colors.scss'
import './index.css'
import { LocaleContextProvider } from '@react5/lib'

import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LocaleContextProvider>
      <App />
    </LocaleContextProvider>
  </StrictMode>,
)
