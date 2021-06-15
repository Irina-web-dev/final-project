import React from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment'

import Checkbox from './Checkbox';
import Collaborators from "./Collaborators";
import Month from "./Month";

const Timeline = ({ startDate, endDate, setStartDate, setEndDate, totalDays }) => { 
  console.log(startDate)
  //connect to collaborators
  const Users = {
    0: "Irina",
    1: "Maria",
  }

  //difference between two dates
  // const days = Math.abs(dateRange[0].diff(dateRange[1], "days"))
  const checkbox = Array.from(new Array(totalDays))
  const collaborators = Array.from(new Array(10))
  const months = Array.from(new Array(Math.floor(totalDays)))

  return (
    <div className="timeline">
      <div className="timeline-months">
        {months.map((_, index) => (
          <Month key={index} index={index}  />
        ))}
      </div>
      <div className="timeline-body">
        <div className="timeline-collaborators">
          {collaborators.map((_, index) => (
            <Collaborators
              key={index}
              index={index}
              users={Users}
  
            />
          ))}
        </div>
          {checkbox.map((_, index) => (
            <div className='checkbox-container'>
              <Checkbox key={index} startDate={startDate} index={index} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Timeline
