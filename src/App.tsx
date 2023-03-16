import { FC } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { useAppSelector } from './app/hooks'
import { CreateCategoryModal, Navbar } from './components/index'
import AppRouter from './router/AppRouter'
import { ThemeProvider } from '@mui/material/styles'
import { colorTheme } from './theme'
import { WelcomePage } from './pages'
import { EditCategoriesModal } from './components/EditCategoriesModal'

const App: FC = () => {
  const { isUserSignedIn } = useAppSelector((state) => state.user)

  return (
    <ThemeProvider theme={colorTheme}>
      <BrowserRouter>
        {isUserSignedIn ? (
          <>
            <EditCategoriesModal />
            <CreateCategoryModal />
            <Navbar />
            <AppRouter />
          </>
        ) : (
          <>
            <WelcomePage />
          </>
        )}
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
