import React, { useState, useEffect } from 'react'
import { useDispatch, batch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'

import user from '../reducers/user'

import { API_URL } from '../reusable/urls'

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
    <>
    {!accessToken 
      ?
      <form onSubmit={onFormSubmit}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
         type="password"
         value={password}
         onChange={(e) => setPassword(e.target.value)}
      />
      {errors? <p>{errors.message}</p> : ''}
      <button type='submit'>Sign up</button>
    </form>
    :
    <div>You have an account now!🎇 Sign in here <span role='img' aria-label='finger pointing'>👉👉👉</span><Link to="/signin">Sign in</Link></div>
    }
    </>
  )
}

export default SignUp 