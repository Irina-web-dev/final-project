<<<<<<< HEAD
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
=======
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components/macro'

import { API_URL } from 'reusable/urls'

import habit, { fetchHabits } from 'reducers/habit'
>>>>>>> 74bd7c3ff0cef9353dedf4a1b79d29b1b13cf47a

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
  height: 25px;
  width: 25px;
  background-color: #d5d5d5;
  border-radius: 5px;
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

<<<<<<< HEAD
const Checkbox = () => {
  const [checkedValue, setCheckedValue] = useState(0)

  // const onHandleChange = (event) => {

  //   setCheckedValue({
  //     ...checkedValue,
  //     [event.target]: event.target.checked
  //   })
    // const target = event.target
    // const value = target.value 

    // if(target.checked) {
    //   [value] = value 
    // } else {
    //   checkedValue.splice(value, 1)
    // }
    // console.log(value)
  // }

  useEffect(() => {
    console.log('Here is the value:',checkedValue);
    }, [checkedValue])

  return (
    <CheckboxWrapper>
      <CheckBtn htmlFor='checkbox'></CheckBtn>
=======
const Checkbox = ({ habitId, index }) => {
  const accessToken = useSelector(store => store.user.accessToken)
  // const [isChecked, setIsChecked] = useState(false)
  // const [mode, setMode] = useState('')

  const dispatch = useDispatch()

    //When checkbox is checked update the number of progress (and vice versa) on the server by using fetch post request and update also the store of all habits
  const onProgressChange = (habitId, index) => {
    if (accessToken) {
      const options = {
        method: 'PATCH',
        headers: {
          Authorization: accessToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ habitId, index }),
      }
    fetch(API_URL(`habits/${habitId}/progress`), options)
    // fetch(API_URL(`habits/${habitId}/progress/${mode}`), options)   
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
  }

  return (
    <CheckboxWrapper>
      <CheckBtn HtmlFor='checkbox'></CheckBtn>
>>>>>>> 74bd7c3ff0cef9353dedf4a1b79d29b1b13cf47a
      <Checkmark
        type="checkbox"
        value={checkedValue}
        id='checkbox'
<<<<<<< HEAD
        // checked={checkedValue}
        onChange={() => setCheckedValue(checkedValue => checkedValue =+ 1)}
=======
        // checked={}
        onChange={() => onProgressChange(habitId, index)}
>>>>>>> 74bd7c3ff0cef9353dedf4a1b79d29b1b13cf47a
      />
    </CheckboxWrapper>
  )
}

export default Checkbox
