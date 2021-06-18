import { createSlice } from '@reduxjs/toolkit'
import { batch } from 'react-redux'

import { API_URL } from 'reusable/urls'

const habit = createSlice({
    name: 'habit',
    initialState: {
        habitsArray: [],
        errors: null,
        editMode: false,
        addMode: false,
        habitId: null,
        habitDescription: '',
        startDate: null,
        endDate: null
    },
    reducers: {
      setHabitsArray: (store, action) => {
        store.habitsArray = action.payload
      },
      setErrors: (store, action) => {
          store.errors = action.payload
      },
      setAddMode: (store, action) => {
        store.addMode = action.payload
      },
      setEditMode: (store, action) => {
        store.editMode = action.payload
      },
      setHabitId: (store, action) => {
        store.habitId = action.payload
      },
      setHabitDescription: (store, action) => {
        store.habitDescription = action.payload
      },
      setStartDate: (store, action) => {
        store.startDate = action.payload
      },
      setEndDate: (store, action) => {
        store.endDate = action.payload
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
                  dispatch(habit.actions.setHabitsArray(data.userHabits))
                  dispatch(habit.actions.setErrors(null))
              });
            } else {
              dispatch(habit.actions.setErrors(data))
            }
        })
    }
  }
}

export const addNewHabit = (accessToken, { title, totalDays, startDate, endDate, collaborator }) => {
  return (dispatch, getStore) => {
    const options = {
      method: 'POST',
      headers: {
        Authorization: accessToken,
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify( { title, totalDays, startDate, endDate, collaborator })
    }
    fetch(API_URL('habits'), options)
      .then(res => res.json())
      .then(data => {
        if(data.success){
          dispatch(fetchHabits(accessToken))
        } else {
          dispatch(habit.actions.setErrors(data)) 
        }
     })
     .catch()
  }
}

export const deleteHabit = (id, accessToken) => {
  return (dispatch, getStore) => {
    if (accessToken) {
      const options = {
        method: 'DELETE',
        headers: {
          Authorization: accessToken,
          'Content-Type': 'application/json'
        }
      }
    fetch(API_URL(`habits/${id}`), options)
      .then(res => res.json())
      .then(data => {
        if(data.success) {
          dispatch(fetchHabits(accessToken))
        } else {
          dispatch(habit.actions.setErrors(data)) 
        }
      })
    }
  }
}

export const editHabit = (id, accessToken, { title, totalDays, startDate, endDate }) => {
  return (dispatch, getStore) => {
    if (accessToken) {
      const options = {
        method: 'PATCH',
        headers: {
          Authorization: accessToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, totalDays, startDate, endDate }),
      }
    fetch(API_URL(`habits/${id}`), options)
      .then(res => res.json())
      .then(data => {
        if(data.success) {
          dispatch(fetchHabits(accessToken))
        } else {
          dispatch(habit.actions.setErrors(data)) 
        }
      })
    }
  }
}

export default habit