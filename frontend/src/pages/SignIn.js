import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import user from '../reducers/user'

const SignIn = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('')
  const [password, setPassword] = useState('')

  const onFormSubmit = (e) => {
    e.preventDefault()
    
    const options = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ usernameOrEmail, password })
    }
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
    <button type='submit'>SignIn</button>
    </form>
  )
}

export default SignIn 