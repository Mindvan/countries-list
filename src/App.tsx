import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './app/routes'

const routerBasename =
  import.meta.env.BASE_URL === '/'
    ? undefined
    : import.meta.env.BASE_URL.replace(/\/$/, '')

function App() {
  return (
    <BrowserRouter basename={routerBasename}>
      <AppRouter />
    </BrowserRouter>
  )
}

export default App
