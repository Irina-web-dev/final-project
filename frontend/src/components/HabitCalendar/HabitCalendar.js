import React from 'react'
import moment from 'moment'

import Timeline from "./Timeline"

const HabitCalendar = () => {

  //collaborators
  const Users = {
    0: "Irina",
    1: "Maria",
  }

  //DatePicker, startDate and endDate
  const dateRange = [moment(), moment().add(20, "days")]

  return <Timeline Users={Users} dateRange={dateRange} />
}

export default HabitCalendar
