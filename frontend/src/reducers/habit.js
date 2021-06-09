import { createSlice } from '@reduxjs/toolkit'
import { batch } from 'react-redux'

import { API_URL } from 'reusable/urls'

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

export const fetchHabits = (accessToken) => {
  return (dispatch, getStore) => {
    if(accessToken) {
      const options = {
        method: 'GET',
        headers: {
            Authorization: accessToken
        }
     }
      fetch(API_URL('habits'), options)
        .then(res => res.json())
        .then(data => {
            if (data.success) {
              batch(() => {
                  dispatch(habit.actions.setHabitsArray(data.userHabits));
                  dispatch(habit.actions.setErrors(null));
              });
            } else {
              dispatch(habit.actions.setErrors(data));
            }
            console.log(data.userHabits)
        });
    }
  }
}

export default habit