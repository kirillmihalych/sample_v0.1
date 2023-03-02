import { FC } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { useAppSelector } from './app/hooks'
import { Navbar, SignIn, SignUp } from './components/index'
import AppRouter from './router/AppRouter'
import { ThemeProvider } from '@mui/material/styles'
import { colorTheme } from './theme'

const App: FC = () => {
  const { isUserSignedIn, isUserSignedUp } = useAppSelector(
    (state) => state.user
  )

  return (
    <ThemeProvider theme={colorTheme}>
      <BrowserRouter>
        {/* <Navbar />
        <AppRouter /> */}
        {isUserSignedIn ? (
          <>
            <Navbar />
            <AppRouter />
          </>
        ) : (
          <>
            <AppRouter />
          </>
        )}
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
