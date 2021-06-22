import React from 'react'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify';
import styled from 'styled-components/macro'
import { MdClose } from 'react-icons/md'

import habit, { addNewHabit, editHabit } from '../reducers/habit'

import DatePicker from './DatePicker'
import SearchBar from './SearchBar'

const Background = styled.div`
  width: 100%;
  height: 90%;
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
  max-width: 300px;
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

  @media (min-width: 668px) {
    min-width: 700px;
  }
`

const TextInput = styled.input`
  width: 289px;
  font-size: 14px;
  padding: 7px;
  border: 1px solid #c9c4c1;

  @media (min-width: 668px) {
    width: 408px;
    font-size: 16px;
  }
`

const SubmitButton = styled.button`
  min-width: 80%;
  background: #141414;
  color: #fff;
  font-size: 16px;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.4);
  cursor: pointer;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  transition: all .2s ease-out;
  margin-top: 20px;

  &:hover {
    background-color: #85dad1;
    color: #000;
  }

  @media (min-width: 668px) {
    font-size: 20px;
    padding: 12px 24px;
  }
`

const CloseButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  border-radius: 4px;
  top: 10px;
  right: 15px;
  width: 26px;
  height: 26px;
  padding: 0;
  margin: 0;
  z-index: 10;
  transition: all .3s ease-out;

  &:hover {
    background-color: #fb3222;
    color: #fff;
  }

  @media (min-width: 668px) {
    width: 32px;
    height: 32px;
    top: 20px;
    right: 20px;
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
  flex-direction: column;
  align-items: flex-start;
  height: 40px;
  font-weight: bold;
  font-size: 16px;

  @media (min-width: 668px) {
    font-size: 20px;
    height: 50px;
    flex-direction: row;
    width: 100%;
    align-items: center;
  }
`

const Title = styled.h1`
  margin: 0;
  font-weight: normal;
  font-size: 24px;

  @media (min-width: 668px) {
    font-size: 34px;
    padding-bottom: 20px;
  }
`

const Question = styled.h2`
  margin: 0;
  font-size: 16px;
  width: 200px;
  font-weight: normal;

  @media (min-width: 668px) {
    font-size: 20px;
  }
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
    toast.success('Habit created succesfully! Go ahead and add another one!')
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