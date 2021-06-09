import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components/macro'
import { MdDelete } from 'react-icons/md'

import { API_URL } from 'reusable/urls'

import { fetchHabits } from '../reducers/habit'

const HabitContainer = styled.div`
  min-width: 500px;
  height: 300px;
  padding: 10px 50px;
  border: none;
  box-shadow:       
    0 14px 28px rgba(0, 0, 0, .2), 
    0 10px 10px rgba(0, 0, 0, .2);
  border-radius: 2px;
  background-color: #d8c6e9;
  margin-top: 30px;
  cursor: pointer;
`

const DeleteButton = styled(MdDelete)`
  cursor: pointer;
  font-size: 24px;
`

const HabitCard = () => {
  const habitsItems = useSelector(store => store.habit.habitsArray)
  const accessToken = useSelector(store => store.user.accessToken)

  const dispatch = useDispatch()

  const onDeleteButtonClick = (id) => {
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
        }
          console.log(data)
      })
    }
  }
  
  return (
    <>
      {habitsItems.map(habit => (
        <HabitContainer key={habit._id}>
          <DeleteButton onClick={() => onDeleteButtonClick(habit._id)}></DeleteButton>
          <h1>{habit.title}</h1>
          <p>Total Days: {habit.duration.totalDays}</p>
          <p>Collaborators: {habit.collaborators.map(user => (
            <span key={user.user_id}>{user.user_id.username}</span>
          ))}</p>
        </HabitContainer>
      ))}
    </>
  )
}

export default HabitCard 