import React from 'react'
import moment from "moment"

import Checkbox from './Checkbox';

const Month = ({ startDate, index, habitId, checkbox }) => {
  const date = moment(startDate).add(index, 'day')

  console.log(moment(checkbox[0]).format('DD/MM'), date.format('DD/MM'))

  const formatedCheckboxes = checkbox.map(item => moment(item).format('DD/MM'))

  return (
    <div className="timeline-month-checkbox">
      <div className="timeline-months-month">{date.format('DD/MM')}</div>
      <div className="timeline-checkboxes">
        <div key={index} className='checkbox-container'> 
          <Checkbox 
            startDate={startDate}
            index={index}
            habit={habitId}
            id={date.toString()}
            checked={formatedCheckboxes.includes(date.format('DD/MM'))}   
          />
        </div>
      </div>
    </div>
  )
}

export default Month
