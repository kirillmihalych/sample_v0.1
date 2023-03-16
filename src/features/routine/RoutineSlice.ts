import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'
import {
  IAllRoutines,
  IRoutine,
  IExercise,
  ISet,
  IAction,
  IReorderExs,
  IAddCategoryToRoutine,
} from '../../interfaces'

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
    if (routine === null) {
      return [
        {
          id: 'empty_routine',
          title: 'пустая тренировка',
          exs: [],
          category: [{ id: 'Все', title: 'Все' }],
        },
      ]
    }
    return JSON.parse(routine)
  } catch (e) {
    console.warn(e)
    return undefined
  }
}

const initialState: IAllRoutines = {
  all_routines: loadFromLocalStorage(),
  filtered_routines: [],
}

const routineSlice = createSlice({
  name: 'routine',
  initialState,
  reducers: {
    // routine actions
    addRoutine(state) {
      let id = uuidv4()
      let short_id = id.slice(0, 3)
      state.all_routines.push({
        id: short_id,
        title: '',
        exs: [],
        category: [
          {
            id: 'Все',
            title: 'Все',
          },
        ],
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
    setRoutineName(state, action: PayloadAction<IAction>) {
      const { routine_id, title } = action.payload
      state.all_routines.map((routine) => {
        if (routine.id === routine_id) {
          routine.title = title as string
        }
        return routine
      })
    },
    reorderRoutines(state, action: PayloadAction<IRoutine[]>) {
      state.all_routines = action.payload
      saveToLocalStorage(state.all_routines)
    },
    addCategoryToRoutine(state, action: PayloadAction<IAddCategoryToRoutine>) {
      const { id, categoryId, checkbox } = action.payload
      state.all_routines.map((routine) => {
        if (routine.id === id) {
          const category = routine.category?.find(
            (category) => category.id === categoryId
          )
          // add category
          if (!category && checkbox) {
            routine.category?.push({ id: categoryId, title: categoryId })
          }
          // remove category
          if (!checkbox) {
            routine.category = routine.category?.filter(
              (item) => item.id !== categoryId
            )
          }
        }
        return routine
      })
      saveToLocalStorage(state.all_routines)
    },
    filterRoutines(state, action: PayloadAction<string>) {
      const id = action.payload
      state.filtered_routines = state.all_routines.filter((routine) => {
        console.log(id)
        let finded = routine.category?.find((category) => category.id === id)
        return finded ? routine : null
      })
    },
    // exercise actions
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
                isDone: false,
              },
            ],
          })
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
    removeExercise(state, action: PayloadAction<IAction>) {
      const { routine_id, ex_id } = action.payload
      state.all_routines.map((routine) => {
        if (routine.id === routine_id) {
          routine.exs = routine.exs.filter((ex: IExercise) => ex.id !== ex_id)
        }
        return routine
      })
    },
    reorderExs(state, action: PayloadAction<IReorderExs>) {
      const { id, exs } = action.payload
      state.all_routines.map((routine) => {
        if (routine.id === id) {
          routine.exs = exs
        }
        return routine
      })
    },
    // sets
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
                isDone: false,
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
    setIsDone(state, action: PayloadAction<IAction>) {
      const { routine_id, ex_id, number } = action.payload
      state.all_routines.map((routine) => {
        if (routine.id === routine_id) {
          routine.exs.map((ex: IExercise) => {
            if (ex.id === ex_id) {
              ex.sets = ex.sets.map((set: ISet) => {
                if (number === set.number) {
                  set.isDone = !set.isDone
                }
                return set
              })
            }
            // if(ex.restTimer){

            // }
            return ex
          })
        }
        return routine
      })
    },
    setIsUndone(state, action: PayloadAction<string>) {
      const routine_id = action.payload
      state.all_routines.map((routine) => {
        if (routine.id === routine_id) {
          routine.exs.map((ex: IExercise) => {
            ex.sets = ex.sets.map((set: ISet) => {
              set.isDone = false
              return set
            })
            return ex
          })
        }
        return routine
      })
    },
    setRestTimer(state, action: PayloadAction<IAction>) {
      const { routine_id, ex_id, num } = action.payload
      state.all_routines.map((routine) => {
        if (routine.id === routine_id) {
          routine.exs.map((ex: IExercise) => {
            if (ex.id === ex_id) {
              ex.restTimer = num
            }
            return ex
          })
        }
        return routine
      })
    },
    // note
    addNote(state, action: PayloadAction<IAction>) {
      const { routine_id, ex_id, title } = action.payload
      state.all_routines.map((routine) => {
        if (routine.id === routine_id) {
          routine.exs.map((ex: IExercise) => {
            if (ex.id === ex_id) {
              ex.note = title
            }
            return ex
          })
        }
        return routine
      })
    },
  },
})

export const {
  // routine actions
  addRoutine,
  saveRoutine,
  removeRoutine,
  setRoutineName,
  addCategoryToRoutine,
  reorderRoutines,
  filterRoutines,
  // exercise actions
  addExercise,
  setExerciseName,
  setExerciseReps,
  setExerciseWeight,
  removeExercise,
  reorderExs,
  // set actions
  addSet,
  removeSet,
  setIsDone,
  setIsUndone,
  setRestTimer,
  // note
  addNote,
} = routineSlice.actions

export default routineSlice.reducer
