import React from 'react'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import habit from '../reducers/habit'

import { API_URL } from 'reusable/urls'

const HabitForm = ({ fetchHabits }) => {
  const [newHabit, setNewHabit] = useState('')

  const dispatch = useDispatch()
  
  const accessToken = useSelector(store => store.user.accessToken)

  const onFormSubmit = (e) => {
    e.preventDefault()

    const options = {
      method: 'POST',
      headers: {
        Authorization: accessToken,
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({ title: newHabit })
    }

    fetch(API_URL('habits'), options)
      .then(res => res.json())
      .then(data => {
        if(data.success){
          fetchHabits()
          setNewHabit('')
        } else {
          dispatch(habit.actions.setErrors(data)) 
        }
     })
     .catch()
  }
  
  return (
    <>
      <form onSubmit={onFormSubmit}>
        <input
          type="text"
          value={newHabit}
          onChange={e => setNewHabit(e.target.value)}
        />
        <button type="submit">Add new habit</button>
      </form>
    </>
  )
}

export default HabitForm 