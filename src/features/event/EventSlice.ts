import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IStateProps {
  restTimerValue: number | string | null
}

const initialState: IStateProps = {
  restTimerValue: null,
}

const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    setRestTimerValue(state, action: PayloadAction<number>) {
      state.restTimerValue = action.payload
    },
  },
})

export const { setRestTimerValue } = eventSlice.actions

export default eventSlice.reducer
