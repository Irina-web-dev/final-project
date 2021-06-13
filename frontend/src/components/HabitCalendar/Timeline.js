import React from 'react'
import moment from 'moment'

import Checkbox from './Checkbox';
import Collaborators from "./Collaborators";
import Month from "./Month";

const Timeline = () => {
  //connect to collaborators
  const Users = {
    0: "Irina",
    1: "Maria",
  }
  //connect to DatePicker, startDate and endDate
  const dateRange = [moment(), moment().add(20, "days")]
  //difference between two dates
  const days = Math.abs(dateRange[0].diff(dateRange[1], "days"))
  const checkbox = Array.from(new Array(days))
  const collaborators = Array.from(new Array(10))
  const months = Array.from(new Array(Math.floor(days)))

  return (
    <div className="timeline">
      <div className="timeline-months">
        {months.map((_, index) => (
          <Month key={index} index={index} startDate={dateRange[0]} />
        ))}
      </div>
      <div className="timeline-body">
        <div className="timeline-collaborators">
          {collaborators.map((_, index) => (
            <Collaborators
              key={index}
              index={index}
              DayNames={Users}
              startDate={dateRange[0]}
            />
          ))}
        </div>
          {checkbox.map((_, index) => (
            <div className='checkbox-container'>
              <Checkbox key={index} startDate={dateRange[0]} index={index} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Timeline
