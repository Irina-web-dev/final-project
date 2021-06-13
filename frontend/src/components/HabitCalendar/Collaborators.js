import React from 'react'

const Week = ({ index, DayNames }) => {
  return <div className="timeline-collaborators-collaborator">{DayNames[index]}</div>;
};

export default Week
