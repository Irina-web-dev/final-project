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

const ModalWrapper = styled.div`
  width: 700px;
  height: 400px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background-color: #fff;
  color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  flex-direction: column;
  position: relative;
  z-index: 10;
  border: 1px solid;
  border-radius: 10px;
  padding: 30px;
`

const TextInput = styled.input`
  width: 400px;
  height: 30px;
  border: 1px solid #c9c4c1;
`

const SubmitButton = styled.button`
  min-width: 100px;
  background: #141414;
  color: #fff;
  font-size: 24px;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.4);
  cursor: pointer;
  border: none;
  border-radius: 4px;
  padding: 16px 32px;
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
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  margin: 0;
  z-index: 10;
  transition: all .2s ease-out;

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
  font-weight: bold;
  font-size: 20px;
`

const HabitForm = () => {
  const editMode = useSelector(store => store.habit.editMode)

  const [title, setTitle] = useState(editMode ? 'Hello' : '')
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [totalDays, setTotalDays] = useState(null)

  const dispatch = useDispatch()
  
  const accessToken = useSelector(store => store.user.accessToken)
  const id = useSelector(store => store.habit.habitId)

  // Resetting the form to default states when user adds/edits a habit
  const resetForm = () => {
    setTitle(editMode ? 'Hello' : '')
    setStartDate(null)
    setEndDate(null)
    setTotalDays(null)
  }

  const onAddNewHabit = (e) => {
    e.preventDefault()
    dispatch(
      addNewHabit(accessToken, { title, totalDays: totalDays, startDate: startDate, endDate: endDate }))
    resetForm()
  }

  const onEditHabit = (e) => {
    e.preventDefault()
    dispatch(editHabit(id, accessToken, { title, totalDays: totalDays, startDate: startDate, endDate: endDate  }))
    dispatch(habit.actions.setEditMode(false))
    resetForm()
  }

  const onCloseButton = () => {
    dispatch(habit.actions.setAddMode(false))
    dispatch(habit.actions.setEditMode(false))
  }

  return (
    <>
      <Background>
        <ModalWrapper>
          <CloseButton onClick={onCloseButton}></CloseButton>
          <ModalForm onSubmit={editMode ? onEditHabit : onAddNewHabit}>
            <InputLabel htmlFor='habit-title'>
              Habit description: 
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
            <SearchBar />
            <SubmitButton type="submit">{editMode ? 'Update Habit' : 'Add Habit'}</SubmitButton>
          </ModalForm>
        </ModalWrapper>
      </Background>
    </>
  )
}

export default HabitForm 