import { FC } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { CreateCategoryModal, Navbar } from './components/index'
import AppRouter from './router/AppRouter'
import { ThemeProvider } from '@mui/material/styles'
import { colorTheme } from './theme'
import { EditCategoriesModal } from './components/EditCategoriesModal'

const App: FC = () => {
  return (
    <ThemeProvider theme={colorTheme}>
      <BrowserRouter>
        <>
          <EditCategoriesModal />
          <CreateCategoryModal />
          <Navbar />
          <AppRouter />
        </>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
