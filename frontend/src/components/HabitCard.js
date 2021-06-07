import React from 'react'
import { useSelector } from 'react-redux'

const HabitCard = () => {
  const habitsItems = useSelector(store => store.habit.habitsArray)
  
  return (
    <>
      {habitsItems.map(habit => (
        <div key={habit._id}>
          <h1>{habit.title}</h1>
          <p>Total Days: {habit.duration.totalDays}</p>
          <p>Collaborators: {habit.collaborators.map(user => (
            <span key={user.user_id}>{user.user_id.username}</span>
          ))}</p>
        </div>
      ))}
    </>
  )
}

export default HabitCard 