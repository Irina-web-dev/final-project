import { createSlice } from '@reduxjs/toolkit'

const user = createSlice({
  name: 'user', 
  initialState: {
    username: null, 
    email: null,
    accessToken: null, 
    habit: [],
    errors: null
  },
  reducers: {
    setUsername: (store, action) => {
      store.username = action.payload
    },
    setEmail: (store, action) => {
      store.email = action.payload
    },
    setAccessToken: (store, action) => {
      store.accessToken = action.payload
    },
    setHabit: (store, action) => {
      store.habit = action.payload
    },
    setErrors: (store, action) => {
      store.errors = action.payload
    }
  }
})

export default user 