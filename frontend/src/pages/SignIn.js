import React, { useState, useEffect } from 'react'
import { useDispatch, batch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components/macro'

import user from '../reducers/user'

import { API_URL } from '../reusable/urls'

const SignIn = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)

  const accessToken = useSelector(store => store.user.accessToken)
  const errors = useSelector(store => store.user.errors)
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    if(accessToken && loggedIn) {
      history.push('/')
    }
  }, [accessToken, history, loggedIn])

  const onFormSubmit = (e) => {
    e.preventDefault()
    
    const options = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ usernameOrEmail, password })
    }

    fetch(API_URL('signin'), options)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          batch (() => {
            dispatch(user.actions.setUsername(data.username))
            dispatch(user.actions.setEmail(data.email))
            dispatch(user.actions.setAccessToken(data.accessToken))
            dispatch(user.actions.setErrors(null))
          })
          setLoggedIn(true)
        } else {
          dispatch(user.actions.setErrors(data))
        }
      })
      .catch()
  }

  const Container = styled.div`
    margin: 30px;
    height: 70vh; 
    max-width: 100%; 
    box-shadow: 
      0 14px 28px rgba(0, 0, 0, .2), 
      0 10px 10px rgba(0, 0, 0, .2);
  `
  const SignUpButton = styled.button`
    width: 100%;
    font-size: 30px; 
    outline: none; 
    background: none; 
    border: none; 
    font-size: 20px; 
  `
  const Form = styled.form`
    display: flex;
    flex-direction: column; 
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 100%;
    padding: 0 50px;
  `
  const TitleText = styled.h1`
   font-size: 20px; 
  `
  const ParagrafText = styled.p`
    letter-spacing: 0,5px;
  `
  const Button = styled.button`
    border-radius: 20px;
    border: 1px solid #eee;
    width: 80%;
    color: #fff; 
    background: #407294;
    padding: 5px; 
    font-size: 12px;
    font-weight: bold;
    letter-spacing: 1px;
    text-transform: uppercase;
    cursor: pointer;
    transition: transform 80ms ease-in;

    &:active {
      transform: scale(.95);
    } 
  ` 
  const InputArea = styled.input`
    background: #eee;
    border: none;
    padding: 12px 15px;
    margin: 8px 0;
    width: 100%;
  `
  const TitleContainer = styled.div`
    display: flex; 
  `
  const Separator = styled.span`
    font-size: 80px; 
  `

  return (
    <Container>
      <Form onSubmit={onFormSubmit}>
        <TitleContainer>
          <TitleText>Sign In</TitleText>
          <SignUpButton> <Separator>|</Separator> Sign Up</SignUpButton>
        </TitleContainer>
          <InputArea
            type="text"
            placeholder="username or email.."
            value={usernameOrEmail}
            onChange={(e) => setUsernameOrEmail(e.target.value)}
          />
          <InputArea
            type="password"
            placeholder="Password.."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors? <p>{errors.message}</p> : ''}
          <ParagrafText>Forgot password?</ParagrafText>
          <Button type='submit'>Sign in</Button>
      </Form>
    </Container>
  )
}

export default SignIn 