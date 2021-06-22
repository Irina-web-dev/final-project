import React from 'react'
import moment from "moment"

import Checkbox from './Checkbox';

const Date = ({ startDate, index, habitId, checkbox }) => {
  const timelineDate = moment(startDate).add(index, 'day')

  const formatedCheckboxes = checkbox.map(item => moment(item).format('DD/MM'))

  return (
    <div className="timeline-month-checkbox">
      <div className="timeline-months-month">{timelineDate.format('DD/MM')}</div>
      <div className="timeline-checkboxes">
        <div className='checkbox-container'> 
          <Checkbox 
            startDate={startDate}
            index={index}
            habit={habitId}
            id={timelineDate.toString()}
            checked={formatedCheckboxes.includes(timelineDate.format('DD/MM'))}   
          />
        </div>
      </div>
    </div>
  )
}

export default Date
