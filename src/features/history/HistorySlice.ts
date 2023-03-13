import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IRoutine } from '../../interfaces'

interface IInitialStateProps {
  history_store: IRoutine[]
}

const initialState: IInitialStateProps = {
  history_store: [],
}

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    saveFinishedWorkout(state, action: PayloadAction<IRoutine>) {
      const routine = action.payload
      state.history_store.push(routine)
    },
  },
})

export const { saveFinishedWorkout } = historySlice.actions

export default historySlice.reducer
