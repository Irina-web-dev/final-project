import React, { useState } from 'react'
import { useDispatch, batch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'

import user from '../reducers/user'

import { API_URL } from '../reusable/urls'

const SignupWrapper = styled.div`
  background: #07b066;
  min-width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
  position: fixed;
`

const Container = styled.div`
  height: 70vh; 
  margin: 20px auto; 
  background: #000;
  border-radius: 5px;
  color: #fff;
  max-width: 300px; 
  display: flex;
  flex-direction: column;
  box-shadow: 
    0 14px 28px rgba(0, 0, 0, .2), 
    0 10px 10px rgba(0, 0, 0, .2);

  @media (min-width: 668px) {
    min-width: 400px; 
    margin: 50px auto; 
  }
`


const Form = styled.form`
  display: flex;
  flex-direction: column; 
  justify-content: center;
  align-items: center;
  text-align: right;
  height: 100%;
  margin: 40px auto; 
  min-width: 300px;

  @media (min-width: 668px) {
    padding: 18px 0;
    margin: 10px 0;
    min-width: 300px;

  }
`


const TitleContainer = styled.div`
  display: flex; 
  margin-bottom: 10px;
`
const TitleText = styled.h1`
  font-size: 28px; 
  text-transform: uppercase;
  text-align: left; 
  margin-top: 0; 

  @media (min-width: 668px) {
    font-size: 35px;  
  }
`


const InputArea = styled.input`
  background: #eee;
  border: none;
  border-radius: 5px;
  min-width: 200px;
  font-size: 18px;
  padding: 16px;

  ::placeholder {
    color: #D21F3C;
    opacity: 0.5; 
  }

  &:focus {
    outline: none; 
    border: 2px solid #407294; 
  }

  @media (min-width: 668px) {
    min-width: 300px;
    font-size: 24px;
  }
}
`


const Button = styled.button`
  border-radius: 50px;
  color: #fff; 
  background: #07b066;
  padding: 12px 35px; 
  margin: 10px; 
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  transition: transform 80ms ease-in;

  &:active {
    transform: scale(.95);
  } 

  @media (min-width: 668px) {
    font-size: 16px;
    width: 60%;
  }
`

const ErrorMessage = styled.div`
  color: #ff3801;
  z-index: 1200;
  height: 40px;
  margin: 0;
  align-items: center;
  padding-top: 5px;
`

const SignUpText = styled.div`
  font-size: 20px;
  text-align: center;
  margin-bottom: 25px;
`

const SignInLink = styled(Link)`
  text-decoration: none;
  color: #fff;
  margin-top: 15px;
  max-width: 200px;
  text-align: center;

  &:active {
    border-bottom: 3px solid #f4e664;
  }

  @media (min-width: 668px) {
    font-size: 16px;
    max-width: 300px;
  }

  }
`

const SignedUpContainer = styled.div`
  display: flex;
  flex-direction: column; 
  justify-content: center; 
  align-items: center; 
  margin: auto; 
  padding: 20px;
`

const SignUp = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const accessToken = useSelector(store => store.user.accessToken)
  const errors = useSelector(store => store.user.errors)
  const dispatch = useDispatch()

  console.log(errors)

  const onFormSubmit = (e) => {
    e.preventDefault()

    const options = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    }

    fetch(API_URL('signup'), options)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          batch (() => {
            dispatch(user.actions.setUsername(data.username))
            dispatch(user.actions.setAccessToken(data.accessToken))
            dispatch(user.actions.setErrors(null))
          })

        } else {
          dispatch(user.actions.setErrors(data))
          setUsername('')
          setPassword('')
        }
      })
      .catch()
  }


  return (
    <SignupWrapper>
      <Container>
      {!accessToken
        ?
        <Form onSubmit={onFormSubmit}>
          <TitleContainer>
            <TitleText>Sign Up </TitleText>
          </TitleContainer>
          <label htmlFor='username'>
            <InputArea
              id='username'
              required
              minlength='2'
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
           </label>
          <ErrorMessage>{errors && errors.error.code === 11000? 'Sorry, that username is already in use': ''}</ErrorMessage>
          <label htmlFor='password'>
            <InputArea
              id='password'
              required
              minlength="6"
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        <ErrorMessage>{errors && errors.error.code !== 11000 ? errors.message : ''}</ErrorMessage>
        <Button type='submit'>Sign up</Button>
      </Form>
      :
      <SignedUpContainer>
        <SignUpText>Your account is set up, login to get started with your new habits!</SignUpText>
        <Button><SignInLink to="/signin">Sign in</SignInLink></Button> 
      </SignedUpContainer>
      }
      </Container>
    </SignupWrapper>
  )
}

export default SignUp 