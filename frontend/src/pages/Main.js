import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components/macro'

import HabitForm from '../components/HabitForm'
import HabitCard from '../components/HabitCard'

const MainPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items:center;
  width: 100%;
`

const Main = () => {
  const accessToken = useSelector(store => store.user.accessToken)
  const history = useHistory() 

  useEffect(() => {
    if(!accessToken) {
      history.push('/')
    }
  }, [accessToken, history])

  return (
    <MainPageWrapper>
      <HabitForm />
      <HabitCard />
    </MainPageWrapper>
  )
}

export default Main 