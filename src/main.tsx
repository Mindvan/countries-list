import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { GlobalStyle } from './app/styles/globalStyle'
import { AppProvider } from './app/providers/AppProvider'

createRoot(document.getElementById('root')!).render(
  <AppProvider>
    <GlobalStyle />
    <App />
  </AppProvider>,
)
