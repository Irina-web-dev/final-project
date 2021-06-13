import React from 'react'
import moment from "moment"

const Month = ({ startDate, index }) => {
  const date = moment(startDate).add(index, 'day')
  const monthName = date.format('DD/MM')

  return <div className="timeline-months-month">{monthName}</div>
}

export default Month
