import { createSlice } from '@reduxjs/toolkit'

const initialState = localStorage.getItem('user')
  ? {
    username:JSON.parse(localStorage.getItem('user')).username,
    email: JSON.parse(localStorage.getItem('user')).email,
    accessToken: JSON.parse(localStorage.getItem('user')).accessToken,
    errors: null
  }
  : {
    username: null, 
    email: null,
    accessToken: null, 
    errors: null
  }
const user = createSlice({
  name: 'user', 
  initialState,
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
    setErrors: (store, action) => {
      store.errors = action.payload
    }
  }
})

export default user 