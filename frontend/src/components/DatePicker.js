import React, { useState } from 'react'
import 'react-dates/initialize'
import { DateRangePicker } from 'react-dates'
import 'react-dates/lib/css/_datepicker.css'
import styled from 'styled-components/macro'

const StyledDatePickerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
  height: 50px;
  & .DateRangePicker,
  .DateRangePickerInput {
    display: flex;
    flex-direction: row;
    border: none;
  }
  .DateInput_input {
    border: 1px solid #c9c4c1;
    height: 12px;
    font-size: 14px;
    max-width: 150px;
  }
  .DateInput_1 {
    max-width: 110px;
  }
  .DateRangePickerInput_arrow_svg {
    width: 80px;
  }
  .DateRangePickerInput_arrow_svg_1 {
    width: 60px;
    height: 37px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media (min-width: 668px) {
    flex-direction: row;
    align-items: center;
    
    & .DateRangePicker,
    .DateRangePickerInput {
      width: 300px;
    }
    .DateInput_input {
      max-width: 100px;
      font-size: 16px;
    }
    .DateInput_1 {
      max-width: 120px;
    }
}
`

const TotalDays = styled.p`
  font-size: 16px;
  margin: 10px 0px;
  display: flex;
  align-self: flex-end;

  @media (min-width: 668px) {
    margin-left: 28px;
  }
`

const Question = styled.h2`
  margin: 0;
  font-size: 16px;
  width: 200px;
  font-weight: normal;

  @media (min-width: 668px) {
    font-size: 20px;
  }
`

const Underline = styled.div`
  width: 50px;
  border-bottom: 1px solid #c9c4c1;
  text-align: center;
`

const DatePicker = ({ startDate, endDate, setStartDate, setEndDate, totalDays, setTotalDays}) => {
  const [focusedInput, setFocusedInput] = useState(null);

  const handleDatesChange = ({ startDate, endDate }) => {
    setStartDate(startDate)
    setEndDate(endDate)
  }

  const getTotalDays = (startDate, endDate) => {
    const date1 = new Date(startDate)
    const date2 = new Date(endDate)
    // One day in milliseconds
    const oneDay = 1000 * 60 * 60 * 24
    // Calculating the time difference between two dates
    const diffInTime = date2.getTime() - date1.getTime()
    // Calculating the no. of days between two dates
    const diffInDays = Math.round(diffInTime / oneDay)
    setTotalDays(diffInDays)
  }

  return (
    <StyledDatePickerWrapper>
      <Question>Choose a time period: </Question>
      <DateRangePicker
        startDate={startDate}
        startDateId='tata-start-date'
        endDate={endDate}
        endDateId='tata-end-date'
        onDatesChange={handleDatesChange}
        focusedInput={focusedInput}
        onFocusChange={focusedInput => setFocusedInput(focusedInput)}
      />
      {startDate && endDate ? getTotalDays(startDate, endDate) : ''}
      <TotalDays>Total: <Underline>{totalDays}</Underline></TotalDays>
    </StyledDatePickerWrapper>
  )
}

export default DatePicker