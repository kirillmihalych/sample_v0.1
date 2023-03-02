import { FC } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { routes, RouteNames, loginPageRoutes } from './index'
import { useAppSelector } from '../app/hooks'

const AppRouter: FC = () => {
  const { isUserSignedIn } = useAppSelector((state) => state.user)

  return isUserSignedIn === true ? (
    <Routes>
      {routes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
      <Route path='*' element={<Navigate to={RouteNames.HOME} replace />} />
    </Routes>
  ) : (
    <Routes>
      {loginPageRoutes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
      <Route path='*' element={<Navigate to={RouteNames.SIGN_IN} replace />} />
    </Routes>
  )

  // <Routes>

  //   {!isUserSignedIn ? <Navigate to={RouteNames.SIGN_IN} replace /> : null}
  // </Routes>
}

export default AppRouter
