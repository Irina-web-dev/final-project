import { createSlice } from '@reduxjs/toolkit'

const habit = createSlice({
    name: 'habit',
    initialState: {
        habitsArray: [],
        errors: null,
        numberOfDays: null
    },
    reducers: {
      setHabitsArray: (store, action) => {
          store.habitsArray = action.payload
      },
      setErrors: (store, action) => {
          store.errors = action.payload
      },
      setNumberOfDays: (store, action) => {
          store.numberOfDays = action.payload
      }
    }
})

export default habit