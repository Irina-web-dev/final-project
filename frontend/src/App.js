import React from 'react'
import { Provider } from 'react-redux'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import user from './reducers/user'
import habit from './reducers/habit'

import Main from './pages/Main'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import NavBar from './components/NavBar'
import SidebarTop from 'components/SidebarTop'

const reducer = combineReducers({
  user: user.reducer,
  habit: habit.reducer
})
const store = configureStore({ reducer })

export const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <NavBar />
        <SidebarTop />
        <Switch>
          <Route exact path='/' component={Main}/>
          <Route path='/signin' component={SignIn}/>
          <Route path='/signup' component={SignUp}/>
        </Switch>
      </Provider>
    </BrowserRouter>
  )
}
