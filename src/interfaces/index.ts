// routines interfaces
export interface IAllRoutines {
  all_routines: IRoutine[]
  filtered_routines: IRoutine[]
}

export interface IRoutine {
  id: string
  title: string
  exs: IExercise[]
  category?: ICategory[]
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
  categoryId: string
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
}

export interface IEditCategory {
  title: string
  name: string
}

// user

export interface IUser {
  name: string
  email: string
  password: string
}
