import React from 'react'
import styled from 'styled-components'
import Lottie from 'react-lottie';
import * as animation from '../assets/animation.json'

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
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
     <Lottie options={defaultOptions} width={300}/>
    </Container>
  )
}

export default EmptyState