import React from 'react'
import { Provider } from 'react-redux'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import user from './reducers/user'

import Header from './components/Header'

import Main from './pages/Main'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'

const reducer = combineReducers({
  user: user.reducer
})
const store = configureStore({ reducer })

export const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Header />
        <Switch>
          <Route exact path='/' component={Main}/>
          <Route path='/signin' component={SignIn}/>
          <Route path='/signup' component={SignUp}/>
        </Switch>
      </Provider>
    </BrowserRouter>
  )
}
