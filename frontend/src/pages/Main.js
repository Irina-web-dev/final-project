import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components/macro'

import HabitForm from '../components/HabitForm'
import HabitCard from '../components/HabitCard'
import Header from '../components/Header'

const MainPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items:center;
`

const Main = () => {
  const accessToken = useSelector(store => store.user.accessToken)
  const history = useHistory() 

  useEffect(() => {
    if(!accessToken) {
      history.push('/signin')
    }
  }, [accessToken, history])


  return (
    <MainPageWrapper>
      <Header />
      <HabitForm />
      <HabitCard />
    </MainPageWrapper>
  )
}

export default Main 