
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components/macro'

import { API_URL } from 'reusable/urls'

import { fetchHabits } from 'reducers/habit'

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
  background-color: #74726b;
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
  &:checked:after {
    display: block;
  }
`


const Checkbox = ({ habit, id, checked }) => {
  const accessToken = useSelector(store => store.user.accessToken)
  const [isChecked, setIsChecked] = useState(checked)
  const [checkboxId, setCheckboxId] = useState(null)
  const [checkboxMode, setCheckboxMode ] = useState(null)
  const [habitId, setHabitId] = useState(null)

  const dispatch = useDispatch()

  //When checkbox is checked update the number of progress (and vice versa) on the server by using fetch post request and update also the store of all habits
  const onChange = (e, habit, id) => {
    setIsChecked(e.target.checked)
    setCheckboxId(id)
    setHabitId(habit)
    setCheckboxMode(isChecked ? 'decrease' : 'increase')  
  }

  useEffect(() => {
    if (accessToken && checkboxMode) {
      updateCheckedCheckboxArray()
    }
  }, [accessToken, checkboxMode, habitId, dispatch])

  const updateCheckedCheckboxArray = () => {
    const options = {
      method: 'PATCH',
      headers: {
        Authorization: accessToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ habitId, checkboxId }),
    }
    fetch(API_URL(`habits/${habitId}/checkbox?checkboxMode=${checkboxMode}`), options)
      .then(res => res.json())
      .then(data => {
        if(data.success) {
          dispatch(fetchHabits(accessToken))
        } else {
          dispatch(habit.actions.setErrors(data)) 
        }
    })
  }

  return (
    <CheckboxWrapper>
      <CheckBtn HtmlFor={id}></CheckBtn>
      <Checkmark
        type="checkbox"
        id={id}
        checked={isChecked}
        onChange={(e) => onChange(e, habit, id)}
      />
    </CheckboxWrapper>
  )
}

export default Checkbox
