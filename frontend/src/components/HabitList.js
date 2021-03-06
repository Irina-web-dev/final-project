import React, { useEffect } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import styled from 'styled-components/macro'
import { MdDelete, MdModeEdit } from 'react-icons/md'
import moment from 'moment'

import { API_URL } from 'reusable/urls'
import habit, { deleteHabit } from '../reducers/habit'

import Timeline from './HabitCalendar/Timeline'
import ProgressBar from './ProgressBar'
import EmptyState from '../components/EmptyState'

const HabitContainer = styled.div`
  width: 280px;
  height: 400px;
  padding: 0 15px;
  border: none;
  display: flex;
  color: #313131;
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

  @media (min-width: 668px) {
    min-width: 650px;
    height: 300px; 
  }

  @media (min-width: 1024px) {
    min-width: 750px;
  }
`

const DeleteButton = styled(MdDelete)`
  cursor: pointer;
  font-size: 20px;
  padding: 10px;
  transition: all .2s ease-out;

  &:hover {
    background-color: #d9d9d9;
    border-radius: 50%;
  }

  @media (min-width: 668px) {
    font-size: 24px;
  }
`

const EditButton = styled(MdModeEdit)`
  cursor: pointer;
  font-size: 20px;
  padding: 10px;
  transition: all .2s ease-out;

  &:hover {
    background-color: #d9d9d9;
    border-radius: 50%;
  }

  @media (min-width: 668px) {
    font-size: 24px;
  }
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  color: #313131
`

const Summary = styled.div`
  display: flex;
  font-size: 12px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  
  @media (min-width: 668px) {
    flex-direction: column;
    align-items: start;
    font-size: 16px;
  }
`

const FlexboxSummaryProgressbar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  @media (min-width: 668px) {
    flex-direction: row;
  }
`

const SummaryText = styled.h3`
  margin: 0;
  min-width: 170px;
  justify-content: center;
  align-items: center;
  display: flex;

  @media (min-width: 668px) {
    margin-bottom: 10px;
  }
`

const Description = styled.h1`
  font-weight: normal;
  font-size: 25px;
  margin: 0;
  align-self: center;
  max-width: 190px;

  @media (min-width: 668px) {
    font-size: 34px;
    max-width: 500px;
  }
`

const DateRangeFlexbox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: left;
`

const DateRange = styled.p`
  display: flex;
  flex-wrap: wrap;
  align-items: left;
  justify-content: left;
`

const DateRangeSpace = styled.span`
  margin-right: 6px;
`

const HabitList = () => {
  const habitsItems = useSelector(store => store.habit.habitsArray)
  const accessToken = useSelector(store => store.user.accessToken)
  const isLoading = useSelector(store => store.habit.isLoading)
  
  const dispatch = useDispatch()

  const onDeleteButtonClick = (id) => {
    dispatch(deleteHabit(id, accessToken))
  }

  const onEditButtonClick = (id, description, startDate, endDate) => {
    dispatch(habit.actions.setEditMode(true))
    dispatch(habit.actions.setHabitId(id))
    dispatch(habit.actions.setHabitDescription(description))
    dispatch(habit.actions.setStartDate(moment(startDate)))
    dispatch(habit.actions.setEndDate(moment(endDate)))
  }

  useEffect(() => {
    dispatch(habit.actions.setIsLoading(true));
    if(accessToken) {
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
                  dispatch(habit.actions.setHabitsArray(data.userHabits))
                  dispatch(habit.actions.setErrors(null))
              });
            } else {
              dispatch(habit.actions.setErrors(data))
            }
        })
        .catch()
        .finally(() => dispatch(habit.actions.setIsLoading(false)));
    }
    // eslint-disable-next-line
  }, [accessToken])


  return (
    <>
      {
        isLoading 
          ?
            <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
          :
            habitsItems.length 
              ? 
                (habitsItems.map(habit => (
                  <HabitContainer key={habit._id}>
                    <Header>
                      <Description>{habit.title}</Description>
                      <div>
                        <EditButton onClick={() => onEditButtonClick(habit._id, habit.title, habit.duration.startDate, habit.duration.endDate)}></EditButton>
                        <DeleteButton onClick={() => onDeleteButtonClick(habit._id)}></DeleteButton>
                      </div>
                    </Header>
                    <FlexboxSummaryProgressbar>
                      <Summary>
                        <SummaryText>Let??s do it for {habit.duration.totalDays} days!</SummaryText>
                        <DateRangeFlexbox>
                          <DateRange><DateRangeSpace>Start:</DateRangeSpace><span>{moment(habit.duration.startDate).format('DD/MM/YYYY')}</span></DateRange>
                          <DateRange><DateRangeSpace>End:</DateRangeSpace><span>{moment(habit.duration.endDate).format('DD/MM/YYYY')}</span></DateRange>
                        </DateRangeFlexbox>
                      </Summary>
                      <ProgressBar 
                        collaborators={habit.collaborators}
                        totalDays={habit.duration.totalDays}
                      />
                    </FlexboxSummaryProgressbar>
                    <Timeline
                      startDate={habit.duration.startDate}
                      endDate={habit.duration.endDate}
                      totalDays={habit.duration.totalDays}
                      collaborators={habit.collaborators}
                      habitId={habit._id}
                    />
                  </HabitContainer>
                  ))
                )
              : 
                <EmptyState/>     
      }
    </>
  )
}

export default HabitList 