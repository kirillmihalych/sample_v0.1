import { CreateRoutinePage, AllRoutinesPage, EditRoutinePage } from '../pages'
import SingleRoutinePage from '../pages/SingleRoutinePage'

export interface IRoute {
  path: string
  element: React.ReactNode
}

export enum RouteNames {
  HOME = '/',
  CREATE_ROUTINE = '/create-routine',
  EDIT_ROUTINE = '/routine-editing/:id',
  SINGLE_ROUTINE = `/routine/:id`,
}

export const routes: IRoute[] = [
  { path: RouteNames.CREATE_ROUTINE, element: <CreateRoutinePage /> },
  { path: RouteNames.HOME, element: <AllRoutinesPage /> },
  { path: RouteNames.SINGLE_ROUTINE, element: <SingleRoutinePage /> },
  { path: RouteNames.EDIT_ROUTINE, element: <EditRoutinePage /> },
]
