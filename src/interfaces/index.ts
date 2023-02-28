// routines interfaces
export interface IAllRoutines {
  all_routines: IRoutine[]
}

export interface IRoutine {
  id: string
  title: string
  exs: IExercise[]
  category?: string[]
}

export interface IExercise {
  id: string
  title: string | undefined
  sets: ISet[]
}

export interface ISet {
  number: string
  weight: string | undefined
  reps: string | undefined
}

export interface IAction {
  routine_id: string
  ex_id?: string
  title?: string
  number?: string
}

export interface IAddCategoryToRoutine {
  id: string
  title: string
  checkbox: boolean
}

export interface IReorderExs {
  id: string | undefined
  exs: IExercise[]
}

// category interfaces

export interface ICategory {
  id: string
  title: string
  content: IRoutine[]
}

export interface IEditCategory {
  title: string
  name: string
}
