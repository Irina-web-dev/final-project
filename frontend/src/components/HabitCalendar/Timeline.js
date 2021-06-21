import React from 'react'
import uniqid from 'uniqid'

import Month from "./Month";

const Timeline = ({ startDate, totalDays, habitId, collaborators }) => { 
  const months = Array.from(new Array(Math.floor(totalDays))).map(() => uniqid())

  return (
    <div className="timeline">
      <div className="timeline-body">
        <div className="timeline-collaborators">
          {collaborators.map(user => (
            <div key={user.user_id._id} className="collaborator">
              <div className="timeline-collaborators-collaborator">{user.user_id.username}</div>
              <div className="timeline-months">
                {months.map((item, index) => (
                  <Month key={index} startDate={startDate} totalDays={totalDays} index={index} habitId={habitId} checkbox={user.checkedCheckbox} />                               
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
