import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import exerciseReducer from '../features/exercises/ExercisesSlice'
import routineReducer from '../features/routine/RoutineSlice'

export const store = configureStore({
  reducer: {
    exercises: exerciseReducer,
    routine: routineReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
