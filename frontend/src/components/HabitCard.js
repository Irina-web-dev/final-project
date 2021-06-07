import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components/macro'

const HabitContainer = styled.div`
  min-width: 500px;
  height: 200px;
  padding: 10px 50px;
  border: none;
  box-shadow: -4px 4px 2px rgba(0, 0, 0, 0.5);
  border-radius: 2px;
  background-color: #efefef;
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