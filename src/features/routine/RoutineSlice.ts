import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

// convert object to string and store in localStorage
const saveToLocalStorage = (workouts: IRoutine[]) => {
  try {
    const routines = JSON.stringify(workouts)
    localStorage.setItem('all_routines', routines)
  } catch (e) {
    console.warn(e)
  }
}

// load string from localStarage and convert into an Object
export const loadFromLocalStorage = () => {
  try {
    const routine = localStorage.getItem('all_routines')
    if (routine === null) return undefined
    return JSON.parse(routine)
  } catch (e) {
    console.warn(e)
    return undefined
  }
}

interface IAllRoutines {
  all_routines: IRoutine[]
}

interface IRoutine {
  id: string
  title: string
  // title: string | undefined
  exs: IExercise[]
}

interface IExercise {
  id: string
  title: string | undefined
  sets: ISet[]
}

interface ISet {
  number: string
  weight: string | undefined
  reps: string | undefined
}

interface IAction {
  routine_id: string
  ex_id?: string
  title?: string
  number?: string
}

const initialState: IAllRoutines = {
  all_routines: loadFromLocalStorage(),
}

const routineSlice = createSlice({
  name: 'routine',
  initialState,
  reducers: {
    addRoutine(state) {
      let id = uuidv4()
      let short_id = id.slice(0, 3)
      state.all_routines.push({
        id: short_id,
        title: '',
        exs: [],
      })
    },
    addExercise(state, action: PayloadAction<string>) {
      const id = action.payload
      let uu_id = uuidv4()
      let short_id = uu_id.slice(0, 3)
      state.all_routines.map((routine) => {
        if (routine.id === id) {
          routine.exs.push({
            id: short_id,
            title: '',
            sets: [
              {
                number: 'initial_id',
                weight: '0',
                reps: '0',
              },
            ],
          })
        }
        return routine
      })
    },
    addSet(state, action: PayloadAction<IAction>) {
      const { routine_id, ex_id } = action.payload
      let id = uuidv4()
      let short_id = id.slice(0, 3)
      state.all_routines.map((routine) => {
        if (routine.id === routine_id) {
          routine.exs.map((ex: IExercise) => {
            if (ex.id === ex_id) {
              ex.sets.push({
                number: short_id,
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
    setRoutineName(state, action: PayloadAction<IAction>) {
      const { routine_id, title } = action.payload
      state.all_routines.map((routine) => {
        if (routine.id === routine_id) {
          routine.title = title as string
        }
        return routine
      })
    },
    setExerciseName(state, action: PayloadAction<IAction>) {
      const { routine_id, ex_id, title } = action.payload
      state.all_routines.map((routine) => {
        if (routine.id === routine_id) {
          routine.exs.map((ex: IExercise) => {
            if (ex.id === ex_id) {
              ex.title = title
            }
            return ex
          })
        }
        return routine
      })
    },
    setExerciseReps(state, action: PayloadAction<IAction>) {
      const { routine_id, ex_id, title: reps, number } = action.payload
      state.all_routines.map((routine) => {
        if (routine.id === routine_id) {
          routine.exs.map((ex: IExercise) => {
            if (ex.id === ex_id) {
              ex.sets.map((set: ISet) => {
                if (set.number === number) {
                  set.reps = reps
                }
                return set
              })
            }
            return ex
          })
        }
        return routine
      })
    },
    setExerciseWeight(state, action: PayloadAction<IAction>) {
      const { routine_id, ex_id, title: weight, number } = action.payload
      state.all_routines.map((routine) => {
        if (routine.id === routine_id) {
          routine.exs.map((ex: IExercise) => {
            if (ex.id === ex_id) {
              ex.sets.map((set: ISet) => {
                if (set.number === number) {
                  set.weight = weight
                }
                return set
              })
            }
            return ex
          })
        }
        return routine
      })
    },
    removeSet(state, action: PayloadAction<IAction>) {
      const { routine_id, ex_id, number } = action.payload
      state.all_routines.map((routine) => {
        if (routine.id === routine_id) {
          routine.exs.map((ex: IExercise) => {
            if (ex.id === ex_id) {
              ex.sets = ex.sets.filter((set: ISet) => set.number !== number)
            }
            return ex
          })
        }
        return routine
      })
    },
    removeExercise(state, action: PayloadAction<IAction>) {
      const { routine_id, ex_id } = action.payload
      state.all_routines.map((routine) => {
        if (routine.id === routine_id) {
          routine.exs = routine.exs.filter((ex: IExercise) => ex.id !== ex_id)
        }
        return routine
      })
    },
    removeRoutine(state, action: PayloadAction<string>) {
      const id = action.payload
      state.all_routines = state.all_routines.filter(
        (routine) => routine.id !== id
      )
      saveToLocalStorage(state.all_routines)
    },
    saveRoutine(state) {
      saveToLocalStorage(state.all_routines)
    },
    reoderRoutines(state, action: PayloadAction<IRoutine[]>) {
      console.log('i work')
      state.all_routines = action.payload
      saveToLocalStorage(state.all_routines)
    },
  },
})

export const {
  addRoutine,
  addExercise,
  addSet,
  setRoutineName,
  setExerciseName,
  setExerciseReps,
  saveRoutine,
  setExerciseWeight,
  removeRoutine,
  removeExercise,
  removeSet,
  reoderRoutines,
} = routineSlice.actions

export default routineSlice.reducer
