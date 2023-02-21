import { CreateRoutinePage, AllRoutinesPage } from '../pages'

export interface IRoute {
  path: string
  element: React.ReactNode
}

export enum RouteNames {
  HOME = '/',
  CREATE_ROUTINE = '/create-routine',
}

export const routes: IRoute[] = [
  { path: RouteNames.CREATE_ROUTINE, element: <CreateRoutinePage /> },
  { path: RouteNames.HOME, element: <AllRoutinesPage /> },
]
