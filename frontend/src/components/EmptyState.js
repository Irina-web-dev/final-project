import React from 'react'
import styled from 'styled-components'
import Lottie from 'react-lottie'
import * as animation from '../assets/animation.json'

const Container = styled.div`
  display: flex; 
  flex-direction: column; 
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`
const EmptyStateMessage = styled.h2`
  font-size: 20px; 
  margin: 5px 20px 0 20px; 
  text-align: center; 
  max-width: 300px; 

  @media (min-width: 668px) {
    max-width: 400px; 
    font-size: 30px;
    padding: 5px 70px 0 70px; 
  }
  @media (min-width: 1200px) {
    max-width: 500px; 
    font-size: 35px;
  }

` 
const defaultOptions = {
  loop: true,
  autoplay: true, 
  animationData: animation.default,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
}

const EmptyState = () => {
  return (
    <Container>
      <EmptyStateMessage>Nothing's going on here, </EmptyStateMessage>
      <EmptyStateMessage>let's add a new habit to stick to!</EmptyStateMessage>
     <Lottie options={defaultOptions} width={300}/>
    </Container>
  )
}

export default EmptyState