import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IRoutine } from '../../interfaces'
// unique id
import { v4 as uuidv4 } from 'uuid'

// convert object to string and store in localStorage
const saveToLocalStorage = (workouts: IRoutine[]) => {
  try {
    const routines = JSON.stringify(workouts)
    localStorage.setItem('history', routines)
  } catch (e) {
    console.warn(e)
  }
}

// load string from localStarage and convert into an Object
export const loadFromLocalStorage = () => {
  try {
    const routine = localStorage.getItem('history')
    if (routine === null) {
      return null
    }
    return JSON.parse(routine)
  } catch (e) {
    console.warn(e)
    return undefined
  }
}

const getExercisesFromHistory = () => {
  const routineStore = loadFromLocalStorage()

  let res: string[] = []

  routineStore.forEach((routine: IRoutine) => {
    routine.exs.forEach((ex) => {
      res.push(ex.title as string)
    })
  })

  const unique = new Set(res)
  return Array.from(unique)
}

interface IInitialStateProps {
  history_store: IRoutine[]
  ex_names: string[]
}

const initialState: IInitialStateProps = {
  history_store: loadFromLocalStorage(),
  ex_names: getExercisesFromHistory(),
}

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    saveFinishedWorkout(state, action: PayloadAction<IRoutine>) {
      let id = uuidv4()
      let short_id = id.slice(0, 3)
      const routine = action.payload
      routine.old_id = routine.id
      routine.id = short_id
      state.history_store.push(routine)

      saveToLocalStorage(state.history_store)
    },
    deleteWorkoutFormHistory(state, action: PayloadAction<string>) {
      const id = action.payload
      state.history_store = state.history_store.filter(
        (routine) => routine.id !== id
      )
      saveToLocalStorage(state.history_store)
    },
  },
})

export const { saveFinishedWorkout, deleteWorkoutFormHistory } =
  historySlice.actions

export default historySlice.reducer
