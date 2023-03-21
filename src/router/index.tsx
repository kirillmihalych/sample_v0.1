import { SignIn, SignUp } from '../components'
import {
  CreateRoutinePage,
  AllRoutinesPage,
  EditRoutinePage,
  CurrentWorkout,
  WelcomePage,
  HistoryPage,
  HistoryRoutinePage,
  SingleRoutinePage,
  AllExercisePage,
} from '../pages'
import ExercisePage from '../pages/ExercisePage'

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
  WELCOME_PAGE = '/welcome_page',
  HISTORY = '/history',
  HISTORY_ROUTINE = '/history/history_routine/:id',
  ALL_EXERCISE = '/all-exercise',
  EXERCISE_PAGE = '/exercise/:id',
}

export const routes: IRoute[] = [
  { path: RouteNames.CREATE_ROUTINE, element: <CreateRoutinePage /> },
  { path: RouteNames.HOME, element: <AllRoutinesPage /> },
  { path: RouteNames.SINGLE_ROUTINE, element: <SingleRoutinePage /> },
  { path: RouteNames.CURRENT_ROUTINE, element: <CurrentWorkout /> },
  { path: RouteNames.EDIT_ROUTINE, element: <EditRoutinePage /> },
  { path: RouteNames.WELCOME_PAGE, element: <WelcomePage /> },
  { path: RouteNames.HISTORY, element: <HistoryPage /> },
  { path: RouteNames.HISTORY_ROUTINE, element: <HistoryRoutinePage /> },
  { path: RouteNames.ALL_EXERCISE, element: <AllExercisePage /> },
  { path: RouteNames.EXERCISE_PAGE, element: <ExercisePage /> },
]

export const loginPageRoutes: IRoute[] = [
  { path: RouteNames.SIGN_IN, element: <SignIn /> },
  { path: RouteNames.SIGN_UP, element: <SignUp /> },
]
