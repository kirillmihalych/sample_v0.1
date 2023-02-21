import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { execSync } from 'child_process'

interface IAllRoutines {
  all_routines: IRoutine[]
}

interface IRoutine {
  id: number
  title: string
  exs: IExercise[]
}

interface IExercise {
  id: number
  title: string
  sets: ISet[]
}

interface ISet {
  number: number
  weight: string
  reps: string
}

interface ISetAction {
  routine_id: number
  ex_id: number
}

const initialState: IAllRoutines = {
  all_routines: [],
}

const routineSlice = createSlice({
  name: 'routine',
  initialState,
  reducers: {
    addRoutine(state) {
      state.all_routines.push({
        id: state.all_routines.length + 1,
        title: 'имя рутины',
        exs: [],
      })
    },
    addExercise(state, action: PayloadAction<number>) {
      const id = action.payload
      state.all_routines.map((routine) => {
        if (routine.id === id) {
          routine.exs.push({
            id: routine.exs.length + 1,
            title: 'new name',
            sets: [],
          })
        }
        return routine
      })
    },
    addSet(state, action: PayloadAction<ISetAction>) {
      const { routine_id, ex_id } = action.payload
      state.all_routines.map((routine) => {
        if (routine.id === routine_id) {
          routine.exs.map((ex: IExercise) => {
            if (ex.id === ex_id) {
              ex.sets.push({
                number: ex.sets.length + 1,
                weight: '0',
                reps: '0',
              })
            }
            return ex
          })
        }
        return routine
      })
    },
  },
})

export const { addRoutine, addExercise, addSet } = routineSlice.actions

export default routineSlice.reducer
