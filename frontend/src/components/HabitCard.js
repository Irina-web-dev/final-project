import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components/macro'

const HabitContainer = styled.div`
  min-width: 500px;
  height: 200px;
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

const HabitCard = () => {
  const habitsItems = useSelector(store => store.habit.habitsArray)
  
  return (
    <>
      {habitsItems.map(habit => (
        <HabitContainer key={habit._id}>
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