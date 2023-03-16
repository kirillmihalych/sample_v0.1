import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ICategory, IEditCategory } from '../../interfaces/index'

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
        { id: 'Все', title: 'Все' },
        {
          id: 'Фавориты',
          title: 'Фавориты',
        },
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
  isEditLablesShowed: boolean
  isEditing: boolean
  isAddCategoryOpen: boolean
  addRoutineId: string
}

const initialState: initialStateTypes = {
  categories: loadFromLocalStorage(),
  drawerOpen: false,
  categoryCreating: false,
  showModal: false,
  isEditLablesShowed: false,
  isEditing: false,
  isAddCategoryOpen: false,
  addRoutineId: '',
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
    openEditLabelList(state) {
      state.isEditLablesShowed = true
    },
    closeEditLabelList(state) {
      state.isEditLablesShowed = false
    },
    removeCategory(state, action: PayloadAction<string>) {
      const title = action.payload

      state.categories = state.categories.filter(
        (category) => category.title !== title
      )
      saveToLocalStorage(state.categories)
    },
    editCategory(state, action: PayloadAction<IEditCategory>) {
      const { title, name } = action.payload

      state.categories.map((category) => {
        if (category.title === title) {
          category.title = name
        }
        return category
      })

      saveToLocalStorage(state.categories)
    },
    closeIsEditing(state) {
      state.isEditing = false
    },
    openIsEditing(state) {
      state.isEditing = true
    },
    openAddCategory(state, action: PayloadAction<string>) {
      state.addRoutineId = action.payload
      state.isAddCategoryOpen = true
    },
    closeAddCategory(state) {
      state.isAddCategoryOpen = false
    },
  },
})

export const {
  toggleDrawer,
  createCategory,
  addCategory,
  closeModal,
  openModal,
  openEditLabelList,
  closeEditLabelList,
  removeCategory,
  editCategory,
  openIsEditing,
  closeIsEditing,
  openAddCategory,
  closeAddCategory,
} = categorySlice.actions

export default categorySlice.reducer
