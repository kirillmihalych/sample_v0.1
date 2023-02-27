import { createSlice } from '@reduxjs/toolkit'
import { ICategory } from '../../interfaces/index'

interface initialStateTypes {
  categories: ICategory[]
  drawerOpen: boolean
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
  drawerOpen: false,
}

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setDrawerOpen(state) {
      state.drawerOpen = true
    },
    setDrawerClose(state) {
      state.drawerOpen = false
    },
  },
})

export const { setDrawerOpen, setDrawerClose } = categorySlice.actions

export default categorySlice.reducer
