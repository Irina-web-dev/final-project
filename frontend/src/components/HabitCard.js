import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'

import habit from '../reducers/habit'

import { API_URL } from 'reusable/urls'

const HabitCard = () => {
  const [newHabit, setNewHabit] = useState('')

  const dispatch = useDispatch()
  const accessToken = useSelector(store => store.user.accessToken)

  useEffect(() => {
    fetchHabits()
  }, [accessToken])

  const fetchHabits = () => {
    if(accessToken) {
      const options = {
        method: 'GET',
        headers: {
          Authorization: accessToken
        }
      }
      fetch(API_URL('habits', options)
        .then(res => res.json()))
        .then(data => {
          if (data.success) {
            batch(() => {
              dispatch(habit.actions.setHabitsArray(data))
              dispatch(habit.actions.setErrors(null))
            })
            console.log('hello', data)
          } else {
            dispatch(habit.actions.setErrors(data))
          }
        })
    }
  }

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
      {/* {habitsItems.map(habit => (
        <>
          <div key={habit._id}>{habit.user.username}</div>
          <div>Collaborators: {habit.user.username}</div>
        </>
      ))} */}
    </>
  )
}

export default HabitCard 