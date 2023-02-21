import { createSlice } from '@reduxjs/toolkit'
import { IExercise } from '../../interfaces/IExercise'

const initialState: IExercise = {
  id: 0,
  title: '',
  sets: [],
}

const exercisesSlice = createSlice({
  name: 'exercises',
  initialState,
  reducers: {},
})

export default exercisesSlice.reducer
