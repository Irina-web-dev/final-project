import React from 'react'

const Week = ({ index, users }) => {
  return <div className="timeline-collaborators-collaborator">{users[index]}</div>;
};

export default Week
