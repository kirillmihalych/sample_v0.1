import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import routineReducer from '../features/routine/RoutineSlice'
import categoryReducer from '../features/category/CategorySlice'
import userReducer from '../features/user/UserSlice'
import historyReducer from '../features/history/HistorySlice'
import eventReducer from '../features/event/EventSlice'

export const store = configureStore({
  reducer: {
    routine: routineReducer,
    category: categoryReducer,
    user: userReducer,
    history: historyReducer,
    event: eventReducer,
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
