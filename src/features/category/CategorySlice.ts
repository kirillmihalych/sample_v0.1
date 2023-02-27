import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ICategory } from '../../interfaces/index'

// convert object to string and store in localStorage
const saveToLocalStorage = (category: ICategory[]) => {
  try {
    const categories = JSON.stringify(category)
    localStorage.setItem('workout_protocol_routines', categories)
  } catch (e) {
    console.warn(e)
  }
}

// load string from localStarage and convert into an Object
export const loadFromLocalStorage = () => {
  try {
    const routine = localStorage.getItem('workout_protocol_routines')
    if (routine === null) {
      return [
        {
          id: 'favorite',
          title: 'Фавориты',
          content: [],
        },
        { id: 'trash', title: 'Мусорка', content: [] },
      ]
    }
    return JSON.parse(routine)
  } catch (e) {
    console.warn(e)
    return undefined
  }
}

interface initialStateTypes {
  categories: ICategory[]
  drawerOpen: boolean
  categoryCreating: boolean
  showModal: boolean
}

const initialState: initialStateTypes = {
  categories: loadFromLocalStorage(),
  drawerOpen: false,
  categoryCreating: false,
  showModal: false,
}

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    toggleDrawer(state) {
      state.drawerOpen = !state.drawerOpen
    },
    createCategory(state) {
      state.showModal = true
      state.drawerOpen = true
      state.categoryCreating = true
    },
    addCategory(state, action: PayloadAction<string>) {
      const tempCategory = {
        id: action.payload,
        title: action.payload,
        content: [],
      }

      state.categories.push(tempCategory)
      saveToLocalStorage(state.categories)
    },
    closeModal(state) {
      state.showModal = false
    },
    openModal(state) {
      state.showModal = true
    },
  },
})

export const {
  toggleDrawer,
  createCategory,
  addCategory,
  closeModal,
  openModal,
} = categorySlice.actions

export default categorySlice.reducer
