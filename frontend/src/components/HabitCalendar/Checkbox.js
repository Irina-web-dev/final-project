import React from 'react'
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
  return (
    <CheckboxWrapper>
      <CheckBtn for='checkbox'></CheckBtn>
      <Checkmark
        type="checkbox"
        id='checkbox'
        // checked={}
        // onChange={}
      />
    </CheckboxWrapper>
  )
}

export default Checkbox
