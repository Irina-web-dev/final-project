import React from 'react'
import styled from 'styled-components/macro'

const ProgressContainer =styled.div`
  display: flex;
  flex-direction: column;
`

const Container =styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  width: 250px;
`

const ProgressBarWrap = styled.div`
  background-color: #f4eee8;
  width: 100px;
  height: 10px;
  border-radius: 16px;
  margin-right: 10px;
  padding: 0;
`

const ProgressBarFill = styled.div`
  background-color: #07b066;
  height: 100%;
  min-width: 0px;
  border-radius: 16px;
`

const Text = styled.p`
  margin: 0;
  color: #767676;
`

const User = styled.div`
  margin-right: 10px;
`

const ProgressBar = ({ collaborators, totalDays }) => {
  return (
    <ProgressContainer>
      {collaborators.map(user => (
        <Container key={user.user_id._id}>
          <User>{user.user_id.username}</User>
          <ProgressBarWrap >
            <ProgressBarFill style={{width: user.progress/totalDays*100}}></ProgressBarFill>
          </ProgressBarWrap>
          <Text>{user.progress}/{totalDays} done</Text>
        </Container>
      ))}
    </ProgressContainer>
  )
}

export default ProgressBar 