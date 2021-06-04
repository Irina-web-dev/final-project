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

  return (
    <form onSubmit={onFormSubmit}>
      <input
        type="text"
        value={usernameOrEmail}
        onChange={(e) => setUsernameOrEmail(e.target.value)}
      />
      <input
         type="password"
         value={password}
         onChange={(e) => setPassword(e.target.value)}
      />
      {errors? <p>{errors.message}</p> : ''}
      <button type='submit'>Sign in</button>
    </form>
  )
}

export default SignIn 