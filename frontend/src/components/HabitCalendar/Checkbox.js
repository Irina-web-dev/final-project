import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

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
      <Checkmark
        type="checkbox"
        value={checkedValue}
        id='checkbox'
        // checked={checkedValue}
        onChange={() => setCheckedValue(checkedValue => checkedValue =+ 1)}
      />
    </CheckboxWrapper>
  )
}

export default Checkbox
