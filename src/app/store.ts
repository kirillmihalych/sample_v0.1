import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import routineReducer from '../features/routine/RoutineSlice'
import categoryReducer from '../features/category/CategorySlice'

export const store = configureStore({
  reducer: {
    routine: routineReducer,
    category: categoryReducer,
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
