import React, { useState, useEffect } from 'react'
import { useDispatch, batch, useSelector } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
import styled from 'styled-components/macro'

import user from '../reducers/user'

import { API_URL } from '../reusable/urls'

const Container = styled.div`
  height: 70vh; 
  margin: 20px auto; 
  width: 80%; 
  max-width: 100%; 
  box-shadow: 
    0 14px 28px rgba(0, 0, 0, .2), 
    0 10px 10px rgba(0, 0, 0, .2);

  @media (min-width: 600px) {
    max-width: 600px; 
    display: flex; 
    margin: 50px auto; 
  }

  @media (min-width: 768px) {
    max-width: 600px; 
    display: flex; 
    margin: 50px auto; 
    width: 60%; 
  }

  @media (min-width: 1024px) {
    width: 45%; 
  }
`
const StyledLink = styled(Link)`
  width: 100%;
  font-size: 25px;  
  outline: none; 
  background: none; 
  border: none; 
  font-size: 20px; 
  color: #D21F3C; 
  text-decoration: none; 
  padding-left: 10px; 

  @media (min-width: 600px) {
   font-size: 30px; 
  }
`
const Form = styled.form`
  display: flex;
  flex-direction: column; 
  justify-content: center;
  align-items: center;
  text-align: right;
  height: 100%;
  padding: 0 50px;
  margin: 40px auto; 
`
const TitleContainer = styled.div`
  display: flex; 
`
const TitleText = styled.h1`
  font-size: 20px; 
  text-transform: uppercase;
  text-align: left; 
  margin-top: 0; 

  @media (min-width: 600px) {
    font-size: 35px;  
  }
`
const Separator = styled.span`
  font-size: 20px; 

  @media (min-width: 600px) {
    font-size: 35px;  
  }
`

const InputArea = styled.input`
  background: #eee;
  border: none;
  padding: 10px 0;
  margin: 8px 5px;
  width: 100%;

  ::placeholder {
    color: #D21F3C;
    padding: 12px; 
    opacity: 0.5; 
  }

  &:focus {
    outline: none; 
    border: 2px solid #407294; 
  }

  @media (min-width: 600px) {
      padding: 18px 0;
      margin: 10px 0;

      ::placeholder {
        font-size: 12px; 
      }
  }

  @media (min-width: 768px) {
    ::placeholder {
      font-size: 14px; 
    }
}
`
const ForgotPassword = styled.a`
  letter-spacing: 0,5px;
  text-decoration: none; 
  margin: 20px 0; 
  text-align: center; 
  font-size: 14px;
  cursor: pointer;

  @media (min-width: 600px) {
    font-size: 16px;
  }
`
const Button = styled.button`
  border-radius: 20px;
  border: 1px solid #eee;
  width: 80%;
  color: #fff; 
  background: #407294;
  padding: 7px; 
  margin: 10px; 
  font-size: 12px;
  font-weight: bold;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  transition: transform 80ms ease-in;

  &:active {
    transform: scale(.95);
  } 

  @media (min-width: 600px) {
    font-size: 16px;
    width: 60%;
  }
` 
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

            localStorage.setItem('user', JSON.stringify({
              username: data.username,
              email: data.email,
              accessToken: data.accessToken
              }))
          })
          setLoggedIn(true)
        } else {
          dispatch(user.actions.setErrors(data))
        }
      })
      .catch()
  }
 
  return (
    <Container>
      <Form onSubmit={onFormSubmit}>
        <TitleContainer>
          <TitleText>Sign In</TitleText>
          <StyledLink to="/signup"> <Separator>|</Separator> Sign Up</StyledLink>
        </TitleContainer>
          <InputArea
            required
            type="text"
            placeholder="username or email"
            value={usernameOrEmail}
            onChange={(e) => setUsernameOrEmail(e.target.value)}
          />
          <InputArea
            required
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors? <p>{errors.message}</p> : ''}
          <ForgotPassword>Forgot password?</ForgotPassword>
          <Button type="submit">Sign in</Button>
      </Form>
    </Container>
  )
}

export default SignIn 