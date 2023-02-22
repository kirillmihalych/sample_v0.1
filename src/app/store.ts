import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import routineReducer from '../features/routine/RoutineSlice'

export const store = configureStore({
  reducer: {
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
