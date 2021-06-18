import React from 'react'
import uniqid from 'uniqid'

import Checkbox from './Checkbox';
import Month from "./Month";

const Timeline = ({ startDate, totalDays, habitId, collaborators }) => { 
  const checkbox = Array.from(new Array(totalDays)).map(() => uniqid())
  const months = Array.from(new Array(Math.floor(totalDays))).map(() => uniqid())

  return (
    <div className="timeline">
      <div className="timeline-months">
        {months.map((_, index) => (
          <Month key={index} startDate={startDate} index={index}  />
        ))}
      </div>
      <div className="timeline-body">
        <div className="timeline-collaborators">
          {collaborators.map(user => (
            <div key={user.user_id._id} className="collaborator">
              <div className="timeline-collaborators-collaborator">{user.user_id.username}</div>
              <div className="timeline-checkboxes">
                {checkbox.map((item, index) => (
                  <div key={index} className='checkbox-container'> 
                    <Checkbox 
                      startDate={startDate}
                      index={index}
                      id={habitId}
                      checkboxId={item}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Timeline
