import React from 'react'
import { batch, useDispatch } from 'react-redux'

import user from '../reducers/user'
import habit from 'reducers/habit'

const LogOut = () => {
  const dispatch = useDispatch()

  const onButtonClick = () => {
    batch(() => {
      dispatch(user.actions.setUsername(null))
      dispatch(user.actions.setEmail(null))
      dispatch(user.actions.setAccessToken(null))
      dispatch(habit.actions.setHabitsArray([]))

      localStorage.removeItem('user')
    })
    
  }

  return(
    <button onClick={onButtonClick}>LOG OUT</button>
  )
}

export default LogOut