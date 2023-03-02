import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { IUser } from '../../interfaces/index'

// convert object to string and store in localStorage
const saveToLocalStorage = (user: IUser) => {
  try {
    localStorage.setItem('user', JSON.stringify(user))
  } catch (e) {
    console.warn(e)
  }
}

// load string from localStarage and convert into an Object
export const loadFromLocalStorage = () => {
  try {
    const user = localStorage.getItem('user')
    if (user === null) {
      return {} as IUser
    }
    return JSON.parse(user)
  } catch (e) {
    console.warn(e)
    return undefined
  }
}

interface IUserStateTypes {
  isUserSignedIn: boolean
  isUserSignedUp: boolean
  user: IUser
  isLoading: boolean
  isError: string
}

const initialState: IUserStateTypes = {
  isUserSignedIn: false,
  isUserSignedUp: false,
  user: loadFromLocalStorage(),
  isLoading: false,
  isError: '',
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    openSignInMode(state) {
      state.isUserSignedIn = false
    },
    closeSignInMode(state) {
      state.isUserSignedIn = true
    },
    setUser(state, action: PayloadAction<IUser>) {
      state.user = action.payload
    },
  },
})

export const { openSignInMode, closeSignInMode, setUser } = userSlice.actions

export default userSlice.reducer
