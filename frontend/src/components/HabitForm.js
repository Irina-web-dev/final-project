import React from 'react'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components/macro'

import habit from '../reducers/habit'

import { API_URL } from 'reusable/urls'

const AddButton = styled.button`
  height: 50px;
  width: 50px;
  background: #3caea3;
  border-radius: 50%;
  color: #fff;
  font-size: 24px;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.4);
  transition: all .2s ease-out;
  cursor: pointer;
  border: none;

  &:hover {
    background-color: #85dad1;
  }
`

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
        <AddButton type="submit">+</AddButton>
      </form>
    </>
  )
}

export default HabitForm 