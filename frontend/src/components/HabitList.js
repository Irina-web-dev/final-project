import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components/macro'
import { MdDelete, MdModeEdit } from 'react-icons/md'
import moment from 'moment'

import habit, { deleteHabit, fetchHabits } from '../reducers/habit'

import Timeline from './HabitCalendar/Timeline'


const HabitContainer = styled.div`
  width: 800px;
  height: 250px;
  padding: 0 15px;
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  box-shadow:       
    0 14px 28px rgba(0, 0, 0, .2), 
    0 10px 10px rgba(0, 0, 0, .2);
  border-radius: 2px;
  background-color: #f4e664;
  cursor: pointer;
  margin-bottom: 30px;

  h1, p {
    margin: 0;
  }
`

const DeleteButton = styled(MdDelete)`
  cursor: pointer;
  font-size: 24px;
  padding: 10px;
  transition: all .2s ease-out;

  &:hover {
    background-color: #d9d9d9;
    border-radius: 50%;
  }
`

const EditButton = styled(MdModeEdit)`
  cursor: pointer;
  font-size: 24px;
  padding: 10px;
  transition: all .2s ease-out;

  &:hover {
    background-color: #d9d9d9;
    border-radius: 50%;
  }
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding-left: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`

const Progressbar = styled.div`
  display: flex;
  justify-content: space-around;
`

const HabitList = () => {
  const habitsItems = useSelector(store => store.habit.habitsArray)
  const accessToken = useSelector(store => store.user.accessToken)
  
  const dispatch = useDispatch()

  const onDeleteButtonClick = (id) => {
    dispatch(deleteHabit(id, accessToken))
  }

  const onEditButtonClick = (id, description, startDate, endDate) => {
    console.log(startDate)
    dispatch(habit.actions.setEditMode(true))
    dispatch(habit.actions.setHabitId(id))
    dispatch(habit.actions.setHabitDescription(description))
    dispatch(habit.actions.setStartDate(moment(startDate)))
    dispatch(habit.actions.setEndDate(moment(endDate)))
  }

  useEffect(() => {
    dispatch(fetchHabits(accessToken))
    // eslint-disable-next-line
  }, [accessToken])


  return (
    <>
      {habitsItems.map(habit => (
        <HabitContainer key={habit._id}>
          <Header>
            <h1>{habit.title}</h1>
            <div>
              <EditButton onClick={() => onEditButtonClick(habit._id, habit.title, habit.duration.startDate, habit.duration.endDate)}></EditButton>
              <DeleteButton onClick={() => onDeleteButtonClick(habit._id)}></DeleteButton>
            </div>
          </Header>
          <Progressbar>
            <p>Total Days: {habit.duration.totalDays}</p>
            <p>StartDate: {moment(habit.duration.startDate).format('DD/MM')}</p>
            <p>endDate: {moment(habit.duration.endDate).format('DD/MM')}</p>
            <p>Collaborators: {habit.collaborators.map(user => (
              <span key={user.user_id}> {user.user_id.username} has done {user.progress} days</span>
            ))}</p>
          </Progressbar>
          <Timeline
            startDate={habit.duration.startDate}
            endDate={habit.duration.endDate}
            totalDays={habit.duration.totalDays}
            collaborators={habit.collaborators}
            habitId={habit._id}
          />
        </HabitContainer>
      ))}
    </>
  )
}

export default HabitList 