import { FC } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Navbar } from './components/index'
import AppRouter from './router/AppRouter'

const App: FC = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <AppRouter />
    </BrowserRouter>
  )
}

export default App
