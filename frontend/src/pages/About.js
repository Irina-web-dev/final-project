import React from 'react'
import styled from 'styled-components'

const Container = styled.div `
  height: 100%;
  width: 100%;
  background: #07b066;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px; 

  @media (min-width: 668px) {
    justify-content: flex-start; 
  }
`

const Card = styled.div`
  max-width: 270px;
  height: 620px;
  padding: 20px;
  border: none;
  color: #ffff;
  justify-content: space-between;
  box-shadow:       
    0 14px 28px rgba(0, 0, 0, .2), 
    0 10px 10px rgba(0, 0, 0, .2);
  border-radius: 10px;
  background-color: #000;
  cursor: pointer;
  
  p {
    font-size: 16px;
    margin-bottom: 8px;
  }

  h1 {
    text-align: center;
  }

  @media (min-width: 668px) {
    min-width: 500px;
    height: auto; 

    p {
      font-size: 18px;
    }
  }

  @media (min-width: 1024px) {
    min-width: 750px;
  }
`


const AboutStickToIt = () => {
  return (
    <Container>
      <Card>
        <h1>About sticKtOiT</h1>
        <p>If you want to create a new habit to stick to for life, we suggest you to try out  our digital Habit Tracking application.</p>
        <p>We believe that the key factor to keep doing something is to get a buddy - someone who will go along with you and keep you motivated if you feel like quitting. And sticKtOiT offers this opportunity. </p>
        <p>To see your progress motivates you to continue, we do not want to see that empty checkbox in your calendar when you are on a good roll.</p>
        <p>Watching your habits grow with your daily life feels satisfying.</p>
        <p>Ideas to start your new daily habits: Read 1 page, meditate for 1 minute, play an instrument for 1 min, take a 5 min walk.</p>   
      </Card>  
    </Container>
  )
}

export default AboutStickToIt