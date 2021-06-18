import React from 'react'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components/macro'
import { MdClose } from 'react-icons/md'

import habit, { addNewHabit, editHabit } from '../reducers/habit'

import DatePicker from './DatePicker'
import SearchBar from './SearchBar'

const Background = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`

const ModalBorder = styled.div`
  padding: 7px;
  background-color: #f4e664;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
`

const ModalWrapper = styled.div`
  width: 700px;
  height: 400px;
  background-color: #fff;
  color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  flex-direction: column;
  position: relative;
  z-index: 10;
  border-radius: 10px;
  padding: 5px;
`

const TextInput = styled.input`
  width: 408px;
  height: 30px;
  font-size: 16px;
  padding-left: 5px;
  border: 1px solid #c9c4c1;
`

const SubmitButton = styled.button`
  min-width: 80%;
  background: #141414;
  color: #fff;
  font-size: 20px;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.4);
  cursor: pointer;
  border: none;
  border-radius: 4px;
  padding: 12px 24px;
  transition: all .2s ease-out;
  margin-top: 20px;

  &:hover {
    background-color: #85dad1;
    color: #000;
  }
`

const CloseButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  border-radius: 4px;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  margin: 0;
  z-index: 10;
  transition: all .3s ease-out;

  &:hover {
    background-color: #fb3222;
    color: #fff;
  }
`

const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  max-width: 100%;
  margin: 20px 40px;
`

const InputLabel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 50px;
  font-weight: bold;
  font-size: 20px;
`

const Title = styled.h1`
  margin: 0;
  padding-bottom: 20px;
  font-weight: normal;
`

const Question = styled.h2`
  margin: 0;
  font-size: 20px;
  width: 200px;
  font-weight: normal;
`

const HabitForm = () => {
  const editMode = useSelector(store => store.habit.editMode)
  const habitDescription = useSelector(store => store.habit.habitDescription)
  const habitStartDate = useSelector(store => store.habit.startDate)
  const habitEndDate = useSelector(store => store.habit.endDate)
  const accessToken = useSelector(store => store.user.accessToken)
  const id = useSelector(store => store.habit.habitId)

  const [title, setTitle] = useState(editMode ? habitDescription : '')
  const [startDate, setStartDate] = useState(editMode ? habitStartDate : null)
  const [endDate, setEndDate] = useState(editMode ? habitEndDate : null)
  const [totalDays, setTotalDays] = useState(null)
  const [collaborator, setCollaborator] = useState('')

  const dispatch = useDispatch()

  // Resetting the form to default states when user adds/edits a habit
  const resetForm = () => {
    setTitle('')
    setStartDate(null)
    setEndDate(null)
    setTotalDays(null)
  }

  const onAddNewHabit = (e) => {
    e.preventDefault()
    dispatch(
      addNewHabit(accessToken, { title, collaborator, totalDays: totalDays, startDate: startDate, endDate: endDate }))
    resetForm()
  }

  const onEditHabit = (e) => {
    e.preventDefault()
    dispatch(editHabit(id, accessToken, { title, collaborator, totalDays: totalDays, startDate: startDate, endDate: endDate  }))
    dispatch(habit.actions.setEditMode(false))
    resetForm()
  }

  const onCloseButton = () => {
    dispatch(habit.actions.setAddMode(false))
    dispatch(habit.actions.setEditMode(false))
  }

  return (
    <Background>
      <ModalBorder>
        <ModalWrapper>
          <CloseButton onClick={onCloseButton}></CloseButton>
          <ModalForm onSubmit={editMode ? onEditHabit : onAddNewHabit}>
            <Title>{editMode ? 'Update your habit' : 'Create new habit'}</Title>
            <InputLabel htmlFor='habit-title'>
              <Question>Habit description: </Question>
              <TextInput
                type='text'
                id='habit-title'
                required
                value={title}
                placeholder='Enter your habit'
                onChange={(e) => setTitle(e.target.value)}
              />
            </InputLabel>
            <DatePicker
              startDate={startDate}
              endDate={endDate}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
              totalDays={totalDays}
              setTotalDays={setTotalDays}
            />
            <SearchBar
              collaborator={collaborator}
              setCollaborator={setCollaborator}
            />
            <SubmitButton type="submit">{editMode ? 'UPDATE HABIT' : 'ADD HABIT'}</SubmitButton>
          </ModalForm>
        </ModalWrapper>
      </ModalBorder>
    </Background>
  )
}

export default HabitForm 