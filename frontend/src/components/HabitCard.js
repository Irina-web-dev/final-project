import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components/macro'
import { MdDelete, MdModeEdit } from 'react-icons/md'

import HeatMapCalendar from './HeatMapCalendar'

import habit, { deleteHabit } from '../reducers/habit'


const HabitContainer = styled.div`
  min-width: 600px;
  height: 200px;
  padding: 10px 30px;
  border: none;
  box-shadow:       
    0 14px 28px rgba(0, 0, 0, .2), 
    0 10px 10px rgba(0, 0, 0, .2);
  border-radius: 2px;
  background-color: #d8c6e9;
  cursor: pointer;
  margin-bottom: 30px;
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

const IconsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
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
    <HeatMapCalendar />
      {habitsItems.map(habit => (
        <HabitContainer key={habit._id}>
          <IconsWrapper>
            <EditButton onClick={() => onEditButtonClick(habit._id)}></EditButton>
            <DeleteButton onClick={() => onDeleteButtonClick(habit._id)}></DeleteButton>
          </IconsWrapper>
          <h1>{habit.title}</h1>
          <p>Total Days: {habit.duration.totalDays}</p>
          <p>Collaborators: {habit.collaborators.map(user => (
            <span key={user.user_id}>{user.user_id.username}</span>
          ))}</p>
        </HabitContainer>
      ))}
    </>
  )
}

export default HabitCard 