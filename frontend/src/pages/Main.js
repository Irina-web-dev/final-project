import React, { useEffect } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import HabitForm from '../components/HabitForm'
import HabitCard from '../components/HabitCard'

import { API_URL } from '../reusable/urls'

import habit from '../reducers/habit'

const Main = () => {
  const accessToken = useSelector(store => store.user.accessToken)

  const history = useHistory()  
  const dispatch = useDispatch()

  useEffect(() => {
    if(!accessToken) {
      history.push('/signin')
    }
  }, [accessToken, history])

  useEffect(() => {
    fetchHabits()
  }, [accessToken])


  const fetchHabits = () => {
    if (accessToken) {
      const options = {
          method: 'GET',
          headers: {
              Authorization: accessToken
          }
      }
    fetch(API_URL('habits'), options)
      .then(res => res.json())
      .then(data => {
          if (data.success) {
            batch(() => {
                dispatch(habit.actions.setHabitsArray(data.userHabits));
                dispatch(habit.actions.setErrors(null));
            });
          } else {
            dispatch(habit.actions.setErrors(data));
          }
          console.log(data.userHabits)
      });
    }
  }

  return (
    <div>
      <HabitForm fetchHabits={fetchHabits} />
      <HabitCard />
    </div>
  )
}

export default Main 