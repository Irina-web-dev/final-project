import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import styled from 'styled-components/macro'
import { MdClose } from 'react-icons/md'

import habit from '../reducers/habit'

import { API_URL } from 'reusable/urls'


const Background = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ModalWrapper = styled.div`
  width: 800px;
  height: 500px;
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
  justify-content: center;
  align-items: center;
`

const HabitForm = () => {
  const [newHabit, setNewHabit] = useState('')
  const [showModal, setShowModal] = useState(false)

  const dispatch = useDispatch()
  
  const accessToken = useSelector(store => store.user.accessToken)

  const onFormSubmit = (e) => {
    e.preventDefault()

    const options = {
      method: 'POST',
      headers: {
        Authorization: accessToken,
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({ title: newHabit })
    }

    fetch(API_URL('habits'), options)
      .then(res => res.json())
      .then(data => {
        if(data.success){
          fetchHabits()
          setNewHabit('')
        } else {
          dispatch(habit.actions.setErrors(data)) 
        }
     })
     .catch()
  }

  useEffect(() => {
    fetchHabits()
  }, [accessToken])


  const fetchHabits = () => {
    if (accessToken) {
      const options = {
          method: 'GET',
          headers: {
              Authorization: accessToken
          }
      }
    fetch(API_URL('habits'), options)
      .then(res => res.json())
      .then(data => {
          if (data.success) {
            batch(() => {
                dispatch(habit.actions.setHabitsArray(data.userHabits));
                dispatch(habit.actions.setErrors(null));
            });
          } else {
            dispatch(habit.actions.setErrors(data));
          }
          console.log(data.userHabits)
      });
    }
  }

  const openModal = () => {
    setShowModal(prev => !prev)
  }
  
  return (
    <>
      {showModal 
        ? 
          <Background>
            <ModalWrapper>
              <CloseButton onClick={openModal}></CloseButton>
              <ModalForm onSubmit={onFormSubmit}>
                <TextInput
                  type="text"
                  value={newHabit}
                  onChange={e => setNewHabit(e.target.value)}
                />
                <SubmitButton type="submit">Submit</SubmitButton>
              </ModalForm>
            </ModalWrapper>
          </Background>
        :
          <AddButton onClick={openModal}>+</AddButton>
      }
    </>
  )
}

export default HabitForm 