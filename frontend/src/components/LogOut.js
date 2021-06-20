import React from 'react'
import { batch, useDispatch } from 'react-redux'
import styled from 'styled-components/macro'

import user from '../reducers/user'
import habit from 'reducers/habit'

const LogOutBtn = styled.button`
  border-radius: 50px;
  background: #f4e664;
  white-space: nowrap;
  padding: 5px 11px;
  color: #010606;
  font-size: 14px;
  font-weight: bold;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;

  &:hover {
    background: #02db82;
    color: #010606;
    transition: all 0.2s ease-in-out;
  }

  @media (min-width: 668px) {
    padding: 10px 22px;
    font-size: 16px;
  }
`

const LogOut = () => {
  const dispatch = useDispatch()

  const onButtonClick = () => {
    batch(() => {
      dispatch(user.actions.setUsername(null))
      dispatch(user.actions.setAccessToken(null))
      dispatch(habit.actions.setHabitsArray([]))

      localStorage.removeItem('user')
    })
    
  }

  return(
    <LogOutBtn onClick={onButtonClick}>LOG OUT</LogOutBtn>
  )
}

export default LogOut