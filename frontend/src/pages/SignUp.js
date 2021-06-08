import React, { useState } from 'react'
import { useDispatch, batch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'

import user from '../reducers/user'

import { API_URL } from '../reusable/urls'

const Container = styled.div`
  margin: 30px;
  height: 70vh; 
  max-width: 100%; 
  box-shadow: 
    0 14px 28px rgba(0, 0, 0, .2), 
    0 10px 10px rgba(0, 0, 0, .2);

    @media (max-width: 1024px) {
      max-width: 600px; 
      display: flex; 
    }
`
const StyledLink = styled(Link)`
    width: 100%;
    font-size: 30px; 
    outline: none; 
    background: none; 
    border: none; 
    font-size: 20px; 
    color: #D21F3C; 
    text-decoration: none; 
    margin-left: 5px; 

    @media (min-width: 768px) {
      
    }
  `
const Form = styled.form`
  display: flex;
  flex-direction: column; 
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100%;
  padding: 0 50px;

  @media (min-width: 768px) {
    padding: 0 70px;
  }
`
const TitleText = styled.h1`
 font-size: 20px; 
 text-align: left; 
 text-transform: uppercase;

 @media (max-width: 1024px) {
  font-size: 25px;  
}
`
const Button = styled.button`
  border-radius: 20px;
  border: 1px solid #eee;
  width: 80%;
  color: #fff; 
  background: #407294;
  padding: 5px; 
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
` 
const InputArea = styled.input`
  background: #eee;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;

  ::placeholder {
    color: #D21F3C;
  }

  @media (max-width: 1024px) {
    width: 80%;  
  }
`
const TitleContainer = styled.div`
  display: flex; 
`
const Separator = styled.span`
  font-size: 40px; 
`

const SignUp = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const accessToken = useSelector(store => store.user.accessToken)
  const errors = useSelector(store => store.user.errors)
  const dispatch = useDispatch()

  const onFormSubmit = (e) => {
    e.preventDefault()
    
    const options = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ username, email, password })
    }

    fetch(API_URL('signup'), options)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          batch (() => {
            dispatch(user.actions.setUsername(data.username))
            dispatch(user.actions.setEmail(data.email))
            dispatch(user.actions.setAccessToken(data.accessToken))
            dispatch(user.actions.setErrors(null))
          })

        } else {
          dispatch(user.actions.setErrors(data))
          setUsername('')
          setEmail('')
          setPassword('')
        }
      })
      .catch()
  }

  return (
    <Container>
    {!accessToken 
      ?
      <Form onSubmit={onFormSubmit}>
        <TitleContainer>
          <TitleText>Sign Up </TitleText>
          <StyledLink to="/signin"> <Separator>|</Separator> Sign In</StyledLink>
        </TitleContainer>
      <InputArea
        required
        type="text"
        placeholder="username.."
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <InputArea
        required
        type="text"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <InputArea
         required
         type="password"
         placeholder="password"
         value={password}
         onChange={(e) => setPassword(e.target.value)}
      />
      {errors? <p>{errors.message}</p> : ''}
      <Button type='submit'>Sign up</Button>
    </Form>
    :
    <div>You have an account now!<Link to="/signin">Sign in</Link></div>
    }
    </Container>
  )
}

export default SignUp 