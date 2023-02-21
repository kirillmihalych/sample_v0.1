import { IExercise } from './IExercise'

export interface IRoutine {
  id: number
  title: string
  exercises: IExercise[]
}
