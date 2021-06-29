import React from 'react'
import { Provider } from 'react-redux'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import user from './reducers/user'
import habit from './reducers/habit'

import Main from './pages/Main'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import About from './pages/About'

import Header from './components/Header'

const reducer = combineReducers({
  user: user.reducer,
  habit: habit.reducer
})
const store = configureStore({ reducer })

export const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Header />
        <Switch>
          <Route 
            exact path='/' 
            component={Home}
          />
          <Route 
            path='/about' 
            component={About}
          />
          <Route 
            path='/main' 
            component={Main}
          />
          <Route 
            path='/signin' 
            component={SignIn}
          />
          <Route 
            path='/signup' 
            component={SignUp}
          />
        </Switch>
      </Provider>
    </BrowserRouter>
  )
}
