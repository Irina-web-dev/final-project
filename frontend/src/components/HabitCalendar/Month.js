import React from 'react'
import moment from "moment"

const Month = ({ startDate, totalDays }) => {
  const date = moment(startDate).add(totalDays, 'day')
  const monthName = date.format('DD/MM')

  return <div className="timeline-months-month">{monthName}</div>
}

export default Month
