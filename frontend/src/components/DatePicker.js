import React, { useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import 'react-dates/initialize'
import { DateRangePicker } from 'react-dates'
import "react-dates/lib/css/_datepicker.css"
import styled from 'styled-components/macro'

import habit from '../reducers/habit'

const StyledDatePickerWrapper = styled.div`
  & .DateRangePicker,
  .DateRangePickerInput {
    display: flex;
    flex-direction: row;
    margin-top: 20px;
    border: none;
  }
  .DateInput_input {
    border: 1px solid #c9c4c1;
  }
  .DateRangePickerInput_arrow_svg {
    width: 100px;
  }
`

const DatePicker = ({ startDate, endDate, setStartDate, setEndDate }) => {
  const [focusedInput, setFocusedInput] = useState(null);

  const dispatch = useDispatch()

  const handleDatesChange = ({ startDate, endDate }) => {
    setStartDate(startDate);
    setEndDate(endDate);
  }

  const numberOfDays = useSelector(store => store.habit.numberOfDays)

  const getNumberOfDays = (startDate, endDate) => {
    const date1 = new Date(startDate)
    const date2 = new Date(endDate)

    // One day in milliseconds
    const oneDay = 1000 * 60 * 60 * 24;

    // Calculating the time difference between two dates
    const diffInTime = date2.getTime() - date1.getTime();

    // Calculating the no. of days between two dates
    const diffInDays = Math.round(diffInTime / oneDay);

    dispatch(habit.actions.setNumberOfDays(diffInDays))
  }

  return (
    <StyledDatePickerWrapper>
      <DateRangePicker
        startDate={startDate}
        startDateId='tata-start-date'
        endDate={endDate}
        endDateId='tata-end-date'
        onDatesChange={handleDatesChange}
        focusedInput={focusedInput}
        onFocusChange={focusedInput => setFocusedInput(focusedInput)}
      />
      {startDate && endDate ? getNumberOfDays(startDate, endDate) : ''}
      {/* <button onClick={() => getNumberOfDays(startDate, endDate)}> Calculate number of days</button>  */}
      <h1>Number of days: {numberOfDays}</h1>
    </StyledDatePickerWrapper>
  );
}

export default DatePicker;