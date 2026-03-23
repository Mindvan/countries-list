import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './app/routes'

function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  )
}

export default App
