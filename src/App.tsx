import { FC } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Navbar } from './components/index'
import AppRouter from './router/AppRouter'
import { ThemeProvider } from '@mui/material/styles'
import { colorTheme } from './theme'

const App: FC = () => {
  return (
    <ThemeProvider theme={colorTheme}>
      <BrowserRouter>
        <Navbar />
        <AppRouter />
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
