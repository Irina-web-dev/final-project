import React from 'react'
import styled from 'styled-components/macro'

const ProgressContainer =styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15px;

  @media (min-width: 668px) {
    margin-top: 0;
  }
`

const Container = styled.div`
  padding: 3px;
  display: flex;
  align-items: center;
  width: 260px;

  @media (min-width: 668px) {
    padding: 10px;
  }
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
  font-size: 12px;

  @media (min-width: 668px) {
    font-size: 14px;
  }
`

const User = styled.div`
  margin-right: 10px;
  width: 50px;
  font-size: 14px;

  @media (min-width: 668px) {
    font-size: 16px;
  }
`

const ProgressBar = ({ collaborators, totalDays }) => {

  return (
    <ProgressContainer>
      {collaborators.map(user => (
        <Container key={user.user_id._id}>
          <User>{user.user_id.username}</User>
          <ProgressBarWrap >
            <ProgressBarFill style={{width: user.checkedCheckbox.length/totalDays*100}}></ProgressBarFill>
          </ProgressBarWrap>
          <Text>{user.checkedCheckbox.length}/{totalDays} done</Text>
        </Container>
      ))}
    </ProgressContainer>
  )
}

export default ProgressBar 