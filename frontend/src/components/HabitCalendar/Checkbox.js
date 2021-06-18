
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components/macro'

import { API_URL } from 'reusable/urls'

import habit, { fetchHabits } from 'reducers/habit'

const CheckboxWrapper = styled.div`
  position: absolute;
`

const CheckBtn = styled.label`
  color: #4c4c4c;
  font-size: 55px;
  font-weights: 600;
  cursor: pointer;
  position: relative;
`

const Checkmark = styled.input.attrs({type:'checkbox'}) `
  appearance: none;
  -webkit-appearance: none;
  height: 30px;
  width: 30px;
  background-color: #d5d5d5;
  border-radius: 50px;
  cursor: pointer; 
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  transition: background-color 0.4s;
  &:after {
    content: "";
    position: absolute;
    width: 9px;
    bottom: 10px;
    height: 14px;
    border-right: 3px solid #fff;
    border-bottom: 3px solid #fff;
    transform: rotateZ(40deg);
    color: #fff;
    display: none;
  }
  &:hover {
    background-color: #2faa8c;
  }
  &:checked {
    background-color: #2faa8c;
  }
  &:checked:after {
    display: block;
  }
`


const Checkbox = ({ id }) => {
  const accessToken = useSelector(store => store.user.accessToken)
  const [isChecked, setIsChecked] = useState(false)
  const [mode, setMode] = useState(null)
  const [habitId, setHabitId] = useState(null)

  const dispatch = useDispatch()

  //When checkbox is checked update the number of progress (and vice versa) on the server by using fetch post request and update also the store of all habits
  const onChange = (e, id) => {
    setIsChecked(e.target.checked)
    setHabitId(id)
    setMode(isChecked ? -1 : 1)  
  }

  useEffect(() => {
    if (accessToken && mode) {
      const options = {
        method: 'PATCH',
        headers: {
          Authorization: accessToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ habitId }),
      }
      fetch(API_URL(`habits/${habitId}/progress?mode=${mode}`), options)
        .then(res => res.json())
        .then(data => {
          console.log(data)
          if(data.success) {
            dispatch(fetchHabits(accessToken))
          } else {
            dispatch(habit.actions.setErrors(data)) 
          }
        })
      }
  }, [accessToken, mode, habitId, dispatch])

  return (
    <CheckboxWrapper>
      <CheckBtn HtmlFor='checkbox'></CheckBtn>
      <Checkmark
        type="checkbox"
        id='checkbox'
        checked={isChecked}
        onChange={(e) => onChange(e, id)}
      />
    </CheckboxWrapper>
  )
}

export default Checkbox
