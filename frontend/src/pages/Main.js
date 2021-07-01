import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components/macro'

import HabitForm from '../components/HabitForm'
import HabitList from '../components/HabitList'

import habit from '../reducers/habit'

const MainPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items:center;
  max-width: 100%;

  @media (min-width: 668px) {
    width: 780px;
  }
`

const ButtonContainer = styled.div`
  padding: 20px;
  width: 50px;

  @media (min-width: 668px) {
    padding-left: 100px;
    width: 100%;
  }

  @media (min-width: 1024px) {
    margin-left: 0;
  }
`

const AddButton = styled.button`
  height: 50px;
  width: 50px;
  align-self: center;
  background: #07b066;
  border-radius: 50%;
  color: #fff;
  font-size: 24px;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.4);
  transition: all .2s ease-out;
  cursor: pointer;
  border: none;

  &:hover {
    background-color: #07b067b6;
  }

  @media (min-width: 668px) {
    align-self: start;
  }
`

const Main = () => {
  const addMode = useSelector(store => store.habit.addMode)
  const editMode = useSelector(store => store.habit.editMode)
  const accessToken = useSelector(store => store.user.accessToken)
  
  const history = useHistory()
  const dispatch = useDispatch() 

  useEffect(() => {
    if(!accessToken) {
      history.push('/')
    }
  }, [accessToken, history])

  return (
    <MainPageWrapper>
      <ButtonContainer>
        <AddButton onClick={() => dispatch(habit.actions.setAddMode(true))}>+</AddButton>
      </ButtonContainer>
      {(addMode || editMode) && <HabitForm /> }
      <HabitList />
    </MainPageWrapper>
  )
}

export default Main 