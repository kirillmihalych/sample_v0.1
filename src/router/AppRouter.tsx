import { FC } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { routes, RouteNames } from './index'

const AppRouter: FC = () => {
  return (
    <Routes>
      {routes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
      <Route path='*' element={<Navigate to={RouteNames.HOME} replace />} />
    </Routes>
  )
}

export default AppRouter
