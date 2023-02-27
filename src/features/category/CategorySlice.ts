import { createSlice } from '@reduxjs/toolkit'
import { ICategory } from '../../interfaces/index'

interface initialStateTypes {
  categories: ICategory[]
}

const initialState: initialStateTypes = {
  categories: [
    {
      id: 'favorite',
      title: 'favorite',
      content: [],
    },
    {
      id: 'trash',
      title: 'trash',
      content: [],
    },
  ],
}

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
})

export default categorySlice.reducer
