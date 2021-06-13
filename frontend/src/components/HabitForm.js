import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components/macro'
import { MdClose } from 'react-icons/md'


import habit, { addNewHabit, fetchHabits, editHabit } from '../reducers/habit'

import DatePicker from './DatePicker'


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
  align-self: center;
  flex-direction: column;
  position: relative;
  z-index: 10;
  border: 1px solid;
  border-radius: 10px;
  padding: 30px;
`

const TextInput = styled.input`
  width: 200px;
  height: 30px;
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

const AddButton = styled.button`
  height: 50px;
  width: 50px;
  background: #3caea3;
  border-radius: 50%;
  color: #fff;
  font-size: 24px;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.4);
  transition: all .2s ease-out;
  cursor: pointer;
  border: none;

  &:hover {
    background-color: #85dad1;
  }
`

const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ButtonContainer = styled.div`
  min-width: 600px;
  padding: 20px 0;
`

const HabitForm = () => {
  const [title, setTitle] = useState('')
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showModal, setShowModal] = useState(false)

  const dispatch = useDispatch()
  
  const accessToken = useSelector(store => store.user.accessToken)
  const numberOfDays = useSelector(store => store.habit.numberOfDays)
  const editMode = useSelector(store => store.habit.editMode)
  const id = useSelector(store => store.habit.habitId)

  // Resetting the form to default states when user adds a habit
  const resetForm = () => {
    setTitle('')
    setStartDate(null)
    setEndDate(null)
    dispatch(habit.actions.setNumberOfDays(null))
  }

  const onAddNewHabit = (e) => {
    e.preventDefault()
    dispatch(addNewHabit(accessToken, { title, totalDays: numberOfDays }))
    resetForm()
  }

  const onEditHabit = (e) => {
    e.preventDefault()
    dispatch(editHabit(id, accessToken, { title, totalDays: numberOfDays }))
    dispatch(habit.actions.setEditMode(false))
    resetForm()
  }

  useEffect(() => {
    dispatch(fetchHabits(accessToken))
    // eslint-disable-next-line
  }, [accessToken])


  const openModal = () => {
    if(editMode === true) {
      dispatch(habit.actions.setEditMode(false))
    } else {
      setShowModal(prev => !prev)
    }
  }
  
  return (
    <>
      {showModal || editMode
        ? 
          <Background>
            <ModalWrapper>
              <CloseButton onClick={openModal}></CloseButton>
              <ModalForm onSubmit={editMode ? onEditHabit : onAddNewHabit}>
                <label htmlFor='habit-title'>Habit:</label>
                <TextInput
                  type='text'
                  id='habit-title'
                  required
                  value={title}
                  placeholder='Enter your habit'
                  onChange={(e) => setTitle(e.target.value)}
                />
                <SubmitButton type="submit">{editMode? 'Update Task' : 'Add Habit'}</SubmitButton>
              </ModalForm>
              <DatePicker
                startDate={startDate}
                endDate={endDate}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
              />
            </ModalWrapper>
          </Background>
        :
          <ButtonContainer>
            <AddButton onClick={openModal}>+</AddButton>
          </ButtonContainer>
      }
    </>
  )
}

export default HabitForm 