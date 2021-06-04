import { createSlice } from '@reduxjs/toolkit'

const habit = createSlice({
    name: 'habit',
    initialState: {
        habitsArray: [],
        errors: null
    },
    reducers: {
        setHabitsArray: (store, action) => {
            store.habitsArray = action.payload
        },
        setErrors: (store, action) => {
            store.errors = action.payload
        }
    }
})

export default habit