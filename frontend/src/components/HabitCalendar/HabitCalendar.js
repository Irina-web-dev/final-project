import React from 'react'

import Timeline from "./Timeline"

const HabitCalendar = ({ startDate, endDate, setStartDate, setEndDate, totalDays }) => {
  return (
    <Timeline
      startDate={startDate}
      endDate={endDate}
      setStartDate={setStartDate}
      setEndDate={setEndDate}   
      totalDays={totalDays}
    />
  )
};

export default HabitCalendar
