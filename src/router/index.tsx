import { SignIn, SignUp } from '../components'
import {
  CreateRoutinePage,
  AllRoutinesPage,
  EditRoutinePage,
  CurrentWorkout,
} from '../pages'
import SingleRoutinePage from '../pages/SingleRoutinePage'

export interface IRoute {
  path: string
  element: React.ReactNode
}

export enum RouteNames {
  HOME = '/',
  SIGN_IN = '/sign-in',
  SIGN_UP = '/sign-in/sign-up',
  CREATE_ROUTINE = '/create-routine',
  EDIT_ROUTINE = '/routine-editing/:id',
  SINGLE_ROUTINE = '/routine/:id',
  CURRENT_ROUTINE = 'current_routine/:id',
}

export const routes: IRoute[] = [
  { path: RouteNames.CREATE_ROUTINE, element: <CreateRoutinePage /> },
  { path: RouteNames.HOME, element: <AllRoutinesPage /> },
  { path: RouteNames.SINGLE_ROUTINE, element: <SingleRoutinePage /> },
  { path: RouteNames.CURRENT_ROUTINE, element: <CurrentWorkout /> },
  { path: RouteNames.EDIT_ROUTINE, element: <EditRoutinePage /> },
]

export const loginPageRoutes: IRoute[] = [
  { path: RouteNames.SIGN_IN, element: <SignIn /> },
  { path: RouteNames.SIGN_UP, element: <SignUp /> },
]
