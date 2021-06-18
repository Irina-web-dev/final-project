import React, { useState } from "react"
import 'react-dates/initialize'
import { DateRangePicker } from 'react-dates'
import "react-dates/lib/css/_datepicker.css"
import styled from 'styled-components/macro'

const StyledDatePickerWrapper = styled.div`
  display: flex;
  margin-top: 20px;
  align-items: center;
  & .DateRangePicker,
  .DateRangePickerInput {
    display: flex;
    flex-direction: row;
    border: none;
    width: 400px;
  }
  .DateInput_input {
    border: 1px solid #c9c4c1;
  }
  .DateRangePickerInput_arrow_svg {
    width: 100px;
  }
`

const TotalDays = styled.p`
  font-size: 16px;
  margin: 0;
`

const DatePicker = ({ startDate, endDate, setStartDate, setEndDate, totalDays, setTotalDays}) => {
  const [focusedInput, setFocusedInput] = useState(null);

  const handleDatesChange = ({ startDate, endDate }) => {
<<<<<<< HEAD
    setStartDate(startDate)
    setEndDate(endDate)
=======
    setStartDate(startDate);
    setEndDate(endDate);
>>>>>>> ba56b454d4133c807c743f05adb176cc6d907cb3
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
      <h3>Choose a time period: </h3>
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
      <TotalDays>Total days: {totalDays}</TotalDays>
    </StyledDatePickerWrapper>
  )
}

export default DatePicker