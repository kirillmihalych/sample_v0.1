import { FC } from 'react'
import { Routes, Route } from 'react-router-dom'
import { routes } from './index'

const AppRouter: FC = () => {
  return (
    <Routes>
      {routes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
    </Routes>
  )
}

export default AppRouter
