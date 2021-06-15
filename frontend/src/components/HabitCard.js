import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components/macro'
import { MdDelete, MdModeEdit } from 'react-icons/md'

import habit, { deleteHabit } from '../reducers/habit'

import HabitCalendar from './HabitCalendar/HabitCalendar'


const HabitContainer = styled.div`
  min-width: 600px;
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

const HabitCard = () => {
  const habitsItems = useSelector(store => store.habit.habitsArray)
  const accessToken = useSelector(store => store.user.accessToken)

  const dispatch = useDispatch()

  const onDeleteButtonClick = (id) => {
    dispatch(deleteHabit(id, accessToken))
  }

  const onEditButtonClick = (id) => {
    dispatch(habit.actions.setEditMode(true))
    dispatch(habit.actions.setHabitId(id))
  }
  
  return (
    <>
      {habitsItems.map(habit => (
        <HabitContainer key={habit._id}>
          <Header>
            <h1>{habit.title}</h1>
            <div>
              <EditButton onClick={() => onEditButtonClick(habit._id)}></EditButton>
              <DeleteButton onClick={() => onDeleteButtonClick(habit._id)}></DeleteButton>
            </div>
          </Header>
          <Progressbar>
            <p>Progress Bar</p>
            <p>Total Days: {habit.duration.totalDays}</p>
            <p>Collaborators: {habit.collaborators.map(user => (
              <span key={user.user_id}>{user.user_id.username}</span>
            ))}</p>
          </Progressbar>
          <HabitCalendar
            startDate={habit.duration.startDate}
            endDate={habit.duration.endDate}
            totalDays={habit.duration.totalDays}
          />
        </HabitContainer>
      ))}
    </>
  )
}

export default HabitCard 